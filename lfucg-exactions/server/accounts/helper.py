from django.conf import settings
from django.template.loader import get_template
from django.core.mail import EmailMultiAlternatives
from django.utils.http import int_to_base36
from rest_framework import viewsets, status, filters
from django.db.models import Q
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.contrib.contenttypes.models import ContentType
from decimal import Decimal
from django.contrib.auth.tokens import PasswordResetTokenGenerator

from django.contrib.auth.models import User
from plats.models import Plat, Lot
from .models import Agreement, AccountLedger, Payment, Project, ProjectCostEstimate
from plats.utils import calculate_lot_balance, calculate_plat_balance

def send_password_reset_email(user, token):
    text_template = get_template('emails/password_reset.txt')
    html_template = get_template('emails/password_reset.html')

    subject, from_email = 'LFUCG Exactions: Password Reset', settings.DEFAULT_FROM_EMAIL

    context = {
        'user': user,
        'baseURL': settings.BASE_URL,
        'uid': int_to_base36(user.id),
        'token': token,
    }

    text_content = text_template.render(context)
    html_content = html_template.render(context)

    msg = EmailMultiAlternatives(subject, text_content, from_email, [user.email])
    msg.attach_alternative(html_content, "text/html")
    msg.send()

def send_lost_username_email(user):
    text_template = get_template('emails/forgot_username.txt')
    html_template = get_template('emails/forgot_username.html')

    subject, from_email = 'LFUCG Exactions: Username', settings.DEFAULT_FROM_EMAIL

    context = {
        'user': user,
        'baseURL': settings.BASE_URL,
    }

    text_content = text_template.render(context)
    html_content = html_template.render(context)

    msg = EmailMultiAlternatives(subject, text_content, from_email, [user.email])
    msg.attach_alternative(html_content, "text/html")
    msg.send()

@receiver(post_save, sender=User)
def send_email_to_new_user(sender, instance, **kwargs):
    user = instance
    token = PasswordResetTokenGenerator().make_token(user)

    text_template = get_template('emails/password_reset.txt')
    html_template = get_template('emails/password_reset.html')

    subject, from_email = 'LFUCG Exactions: Password Reset', settings.DEFAULT_FROM_EMAIL

    context = {
        'user': user,
        'baseURL': settings.BASE_URL,
        'uid': int_to_base36(user.id),
        'token': token,
    }

    text_content = text_template.render(context)
    html_content = html_template.render(context)

    msg = EmailMultiAlternatives(subject, text_content, from_email, [user.email])
    msg.attach_alternative(html_content, "text/html")
    try:
        msg.send()
    except Exception as exc:
        print('SEND NEW USER EMAIL EXCEPTION', exc)

@receiver(post_save, sender=Agreement)
@receiver(post_save, sender=AccountLedger)
@receiver(post_save, sender=Payment)
@receiver(post_save, sender=Project)
@receiver(post_save, sender=ProjectCostEstimate)
@receiver(post_save, sender=Plat)
@receiver(post_save, sender=Lot)
def send_email_to_supervisors(sender, instance, created=False, **kwargs):

    if instance.modified_by.is_superuser or (hasattr(instance.modified_by, 'profile') and instance.modified_by.profile.is_supervisor == True):
        return

    ctype = ContentType.objects.get_for_model(instance)

    if ctype.app_label == 'accounts':
        group = ['Finance']
    elif ctype.app_label == 'plats':
        group = ['Planning']

    users = User.objects.filter(Q(profile__is_supervisor=True) & Q(groups__name__in=group))

    to_emails = list(users.values_list('email', flat=True))

    html_template = get_template('emails/supervisor_email.html')
    text_template = get_template('emails/supervisor_email.txt')

    subject = 'LFUCG Exactions Activity: New Entry Pending Approval'
    from_email = settings.DEFAULT_FROM_EMAIL

    context = {
        'baseURL': settings.BASE_URL,
        'model': ctype.model,
        'staticURL': settings.STATIC_URL,
        'id': instance.id,
    }

    html_content = html_template.render(context)
    text_content = text_template.render(context)

    msg = EmailMultiAlternatives(subject, text_content, from_email, to_emails)
    msg.attach_alternative(html_content, "text/html")
    msg.send()

@receiver(pre_save, sender=Agreement)
@receiver(pre_save, sender=AccountLedger)
@receiver(pre_save, sender=Payment)
@receiver(pre_save, sender=Project)
@receiver(pre_save, sender=ProjectCostEstimate)
@receiver(pre_save, sender=Plat)
@receiver(pre_save, sender=Lot)
def set_approval(sender, instance, **kwargs):
    if instance.modified_by.is_superuser == True or (hasattr(instance.modified_by, 'profile') and instance.modified_by.profile.is_supervisor == True):
        instance.is_approved = True
    else:
        instance.is_approved = False
    return instance

@receiver(post_save, sender=Payment)
@receiver(post_save, sender=AccountLedger)
def calculate_current_lot_balance(sender, instance, **kwargs):
    related_lot = None

    if sender.__name__ == 'Payment':
        related_lot = Lot.objects.filter(id=instance.lot_id_id)
    elif sender.__name__ == 'AccountLedger':
        related_lot = Lot.objects.filter(id=instance.lot_id)

    if related_lot.exists():
        lot = related_lot.first()
        lot_balances = calculate_lot_balance(lot)

        lot.current_dues_roads_dev = lot_balances['dues_roads_dev']
        lot.current_dues_roads_own = lot_balances['dues_roads_own']
        lot.current_dues_sewer_trans_dev = lot_balances['dues_sewer_trans_dev']
        lot.current_dues_sewer_trans_own = lot_balances['dues_sewer_trans_own']
        lot.current_dues_sewer_cap_dev = lot_balances['dues_sewer_cap_dev']
        lot.current_dues_sewer_cap_own = lot_balances['dues_sewer_cap_own']
        lot.current_dues_parks_dev = lot_balances['dues_parks_dev']
        lot.current_dues_parks_own = lot_balances['dues_parks_own']
        lot.current_dues_storm_dev = lot_balances['dues_storm_dev']
        lot.current_dues_storm_own = lot_balances['dues_storm_own']
        lot.current_dues_open_space_dev = lot_balances['dues_open_space_dev']
        lot.current_dues_open_space_own = lot_balances['dues_open_space_own']

        super(Lot, lot).save()

@receiver(post_save, sender=Payment)
@receiver(post_save, sender=AccountLedger)
def calculate_current_plat_balance(sender, instance, **kwargs):
    related_lot = None

    if sender.__name__ == 'Payment':
        related_lot = Lot.objects.filter(id=instance.lot_id_id)
    elif sender.__name__ == 'AccountLedger':
        related_lot = Lot.objects.filter(id=instance.lot_id)

    if related_lot.exists():
        related_plat = Plat.objects.filter(id=related_lot.first().plat.id)
        
        if related_plat.exists():
            plat = related_plat.first()
            plat_balances = calculate_plat_balance(plat)

            plat.current_sewer_due = plat_balances['plat_sewer_due']
            plat.current_non_sewer_due = plat_balances['plat_non_sewer_due']

            super(Plat, plat).save()

