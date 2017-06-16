from rest_framework import serializers

from django.contrib.auth.models import User
from .models import *

class AccountLedgerSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountLedger
        fields = (
            'id',
            'is_approved',
            'is_active',
            'entry_date',
            'date_created',
            'date_modified',
            'created_by',
            'modified_by',
            'account_from',
            'account_to',
            'lot',
            'agreement',
            'entry_type',
            'non_sewer_credits',
            'sewer_credits',
        )

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = (
            'id',
            'is_approved',
            'is_active',
            'lot_id',
            'date_created',
            'date_modified',
            'created_by',
            'modified_by',
            'paid_by',
            'paid_by_type',
            'payment_type',
            'check_number',
            'credit_source',
            'credit_account',
            'paid_roads',
            'paid_sewer_trans',
            'paid_sewer_cap',
            'paid_parks',
            'paid_storm',
            'paid_open_space',
        )

class ProjectCostEstimateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCostEstimate
        fields = (
            'id',
            'is_approved',
            'is_active',
            'date_created',
            'date_modified',
            'created_by',
            'modified_by',
            'project_id',
            'estimate_type',
            'land_cost',
            'design_cost',
            'construction_cost',
            'admin_cost',
            'management_cost',
            'credits_available',
        )

class ProjectSerializer(serializers.ModelSerializer):
    project_cost_estimates = ProjectCostEstimateSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = (
            'id',
            'is_approved',
            'is_active',
            'date_created',
            'date_modified',
            'created_by',
            'modified_by',
            'agreement_id',
            'expansion_area',
            'project_category',
            'project_type',
            'project_description',
            'project_status',
            'status_date',
            'project_cost_estimates',
        )

class AgreementSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True, read_only=True)
    account_ledgers = AccountLedgerSerializer(many=True, read_only=True)
    payments = PaymentSerializer(many=True, read_only=True)

    class Meta:
        model = Agreement
        fields = (
            'id',
            'is_approved',
            'is_active',
            'date_executed',
            'date_created',
            'date_modified',
            'created_by',
            'modified_by',
            'account_id',
            'resolution_number',
            'expansion_area',
            'agreement_type',
            'projects',
            'account_ledgers',
        )

class AccountSerializer(serializers.ModelSerializer):
    agreements = AgreementSerializer(many=True, read_only=True)
    account_ledgers = AccountLedgerSerializer(many=True, read_only=True)
    payments = PaymentSerializer(many=True, read_only=True)

    class Meta:
        model = Account
        fields = (
            'id',
            'is_active',
            'date_created',
            'date_modified',
            'created_by',
            'modified_by',
            'account_name',
            'contact_first_name',
            'contact_last_name',
            'contact_full_name',
            'address_city',
            'address_state',
            'address_zip',
            'address_full',
            'phone',
            'email',
            'agreements',
            'account_ledgers',
        )

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
        )
