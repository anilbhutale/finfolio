"""
Django settings for api project.

Generated by 'django-admin startproject' using Django 5.0.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

import os
from datetime import timedelta
from pathlib import Path

from django.templatetags.static import static

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# .env.
SECRET_KEY = os.environ.get("SECRET_KEY", "test")

# .env.
DEBUG = int(os.environ.get("DEBUG", default=0))

# .env.
# ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS").split(" ")

# Application definition
INSTALLED_APPS = [
    "unfold",  # before django.contrib.admin
    "unfold.contrib.filters",  # optional, if special filters are needed
    "unfold.contrib.forms",  # optional, if special form elements are needed
    "unfold.contrib.inlines",  # optional, if special inlines are needed
    "unfold.contrib.import_export",  # optional, if django-import-export package is used
    "unfold.contrib.guardian",  # optional, if django-guardian package is used
    "unfold.contrib.simple_history",  # optional, if django-simple-history package is used
    "django.contrib.admin",  # required
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django_extensions",
    "corsheaders",
    "drf_yasg",
    "rest_framework",
    "rest_framework_simplejwt",
    "core",
    "core.upi",
    "core.users",
    "core.bank_account",
    "core.credit_card",
    "core.debit_card",
    "core.invoice",
    "core.invoice_group",
    "core.invoice_user",
    "core.loan",
    "core.select_option",
    "core.transaction",
    "core.wallet",
    "core.category",
    "core.color",
    "core.customer",
    "core.inventory",
    "core.product",
    "core.size",
    "core.type",
    "core.variant",
    "core.billing",
]

SWAGGER_SETTINGS = {
    "SECURITY_DEFINITIONS": {"api_key": {"type": "apiKey", "in": "header", "name": "Authorization"}},
}
CSRF_TRUSTED_ORIGINS = ['https://wifi.bhutale.in']
SECURE_SSL_REDIRECT = True  # Redirect HTTP to HTTPS
CSRF_COOKIE_SECURE = True  # Ensure CSRF cookies are sent only over HTTPS

ALLOWED_HOSTS = [
    'wifi.bhutale.in', 
    "localhost",
    "127.0.0.1",
    "django",
    "react",
    "nginx",
    "yourdomain.com",
    "138.68.126.112",
    "http://wifi.bhutale.in/",
    "https://wifi.bhutale.in/",
    "wifi.bhutale.in",
    "192.168.31.218",
    '103.235.105.48',
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Add the specific origins that are allowed to access the API
    "http://localhost:8080",
    "http://localhost:3001",  # Add the specific origins that are allowed to access the API
    "http://localhost:8001",
    "http://localhost:8000",
    "http://103.235.105.48",
    "http://wifi.bhutale.in",
    "https://wifi.bhutale.in",
    "http://103.235.105.48:8000",
    "http://103.235.105.48:8080",
    "http://103.235.105.48:80",
    "http://localhost",
]

CORS_ALLOW_CREDENTIALS = True

ROOT_URLCONF = "api.urls"
# put on your settings.py file below INSTALLED_APPS
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    "DEFAULT_AUTHENTICATION_CLASSES": ("rest_framework_simplejwt.authentication.JWTAuthentication",),
    # "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    # "PAGE_SIZE": 10,
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),
    "SLIDING_TOKEN_LIFETIME": timedelta(days=30),
    "SLIDING_TOKEN_REFRESH_LIFETIME_LATE_USER": timedelta(days=1),
    "SLIDING_TOKEN_LIFETIME_LATE_USER": timedelta(days=30),
}
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "api.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases
DATABASES = {
    "default": {
        "ENGINE": os.environ.get("SQL_ENGINE", "django.db.backends.sqlite3"),
        "NAME": os.environ.get("SQL_DATABASE", os.path.join(BASE_DIR, "db.sqlite3")),
        "USER": os.environ.get("SQL_USER", "user"),
        "PASSWORD": os.environ.get("SQL_PASSWORD", "password"),
        "HOST": os.environ.get("SQL_HOST", "localhost"),
        "PORT": os.environ.get("SQL_PORT", "5432"),
    }
}

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


AUTH_USER_MODEL = "users.CustomUser"

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_L10N = True
USE_TZ = True


STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]

# Additional directories to look for static files
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]
MEDIA_URL = "/api_media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

UNFOLD_ADMIN = {
    "theme": "default",  # Use a theme that fits your project's design
    "compact": True,  # Compact mode can help in making tables look more consistent
    # Add more settings if `unfold` provides any additional global configurations
}

UNFOLD = {
    "SITE_TITLE": "FinFolio",
    "SITE_HEADER": "FinFolio Admin",
    "SITE_URL": "/",
    # "SITE_ICON": lambda request: static("icon.svg"),  # both modes, optimise for 32px height
    "SITE_ICON": {
        "light": "https://www.svgrepo.com/show/246745/archery-bow.svg",  # light mode
        "dark": "https://www.svgrepo.com/show/246745/archery-bow.svg",  # dark mode
    },
    # "SITE_LOGO": lambda request: static("logo.svg"),  # both modes, optimise for 32px height
    "SITE_LOGO": {
        "light": "https://www.svgrepo.com/show/246745/archery-bow.svg",  # light mode
        "dark": "https://www.svgrepo.com/show/246745/archery-bow.svg",  # dark mode
    },
    "SITE_SYMBOL": "speed",  # symbol from icon set
    "SITE_FAVICONS": [
        {
            "rel": "icon",
            "sizes": "32x32",
            "type": "image/svg+xml",
            "href": lambda request: static("favicon.svg"),
        },
    ],
    "SHOW_HISTORY": True,  # show/hide "History" button, default: True
    "SHOW_VIEW_ON_SITE": True,  # show/hide "View on site" button, default: True
    # "ENVIRONMENT": "sample_app.environment_callback",
    # "DASHBOARD_CALLBACK": "sample_app.dashboard_callback",
    "THEME": "light",  # Force theme: "dark" or "light". Will disable theme switcher
    "LOGIN": {
        # "image": lambda request: static("sample/login-bg.jpg"),
        "image": "https://www.svgrepo.com/show/246745/archery-bow.svg",
        # "redirect_after": lambda request: reverse_lazy("admin:APP_MODEL_changelist"),
    },
    "STYLES": [
        lambda request: static("css/style.css"),
    ],
    "SCRIPTS": [
        lambda request: static("js/script.js"),
    ],
    "COLORS": {
        "primary": {
            "50": "250 245 255",
            "100": "243 232 255",
            "200": "233 213 255",
            "300": "216 180 254",
            "400": "192 132 252",
            "500": "168 85 247",
            "600": "147 51 234",
            "700": "126 34 206",
            "800": "107 33 168",
            "900": "88 28 135",
            "950": "59 7 100",
        },
    },
    "EXTENSIONS": {
        "modeltranslation": {
            "flags": {
                "en": "🇬🇧",
                "fr": "🇫🇷",
                "nl": "🇧🇪",
            },
        },
    },
    "SIDEBAR": {
        "show_search": False,  # Search in applications and models names
        "show_all_applications": False,  # Dropdown with all applications and models
        # "navigation": [
        #     {
        #         "title": _("Navigation"),
        #         "separator": True,  # Top border
        #         "collapsible": True,  # Collapsible group of links
        #         # "items": [
        #         #     {
        #         #         "title": _("Dashboard"),
        #         #         "icon": "dashboard",  # Supported icon set: https://fonts.google.com/icons
        #         #         "link": reverse_lazy("admin:index"),
        #         #         # "badge": "sample_app.badge_callback",
        #         #         "permission": lambda request: request.user.is_superuser,
        #         #     },
        #         #     {
        #         #         "title": _("Users"),
        #         #         "icon": "people",
        #         #         "link": reverse_lazy("admin:users_user_changelist"),
        #         #     },
        #         # ],
        #     },
        # ],
    },
    # "TABS": [
    #     {
    #         # "models": [
    #         #     "app_label.model_name_in_lowercase",
    #         # # ],
    #         # "items": [
    #         #     {
    #         #         "title": _("Your custom title"),
    #         #         # "link": reverse_lazy("admin:app_label_model_name_changelist"),
    #         #         # "permission": "sample_app.permission_callback",
    #         #     },
    #         # ],
    #     },
    # ],
}


def dashboard_callback(request, context):
    """
    Callback to prepare custom variables for index template which is used as dashboard
    template. It can be overridden in application by creating custom admin/index.html.
    """
    context.update(
        {
            "sample": "example",  # this will be injected into templates/admin/index.html
        }
    )
    return context


def environment_callback(request):
    """
    Callback has to return a list of two values represeting text value and the color
    type of the label displayed in top right corner.
    """
    return ["Production", "danger"]  # info, danger, warning, success


def badge_callback(request):
    return 3


# def permission_callback(request):
#     return request.user.has_perm("sample_app.change_model")
