from django.contrib.auth.models import User
from rest_framework import serializers

from rest_framework.authtoken.models import Token

class CurrentUserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    permissions = serializers.SerializerMethodField(read_only=True)

    def get_token(self, obj):
        token_value = Token.objects.filter(user=obj)[0].key
        return token_value

    def get_permissions(self, obj):
        permission_set = {}
        for permission in obj.get_all_permissions():
            permission_name = permission[permission.index('_') + 1: len(permission)]

            permission_set[permission_name] = True

        return permission_set

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'is_superuser',
            'token',
            'permissions',
        )
