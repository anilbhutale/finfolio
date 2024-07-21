from django.urls import include, path

from core.bank_account.views import BankAccountViewSet
from core.common import urls as commom_url
from core.credit_card.views import CreditCardViewSet
from core.debit_card import urls as debit_url
from core.invoice import urls as invoice_url
from core.invoice_group import urls as invoice_group_url
from core.invoice_user import urls as invoice_user_url
from core.loan.views import LoanListCreateView, LoanRetrieveUpdateDestroyView
from core.select_option import urls as select_option_url
from core.transaction import urls as transaction_url

bank_account_list = BankAccountViewSet.as_view({"get": "list", "post": "create"})
bank_account_detail = BankAccountViewSet.as_view({"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"})
credit_card_list = CreditCardViewSet.as_view({"get": "list", "post": "create"})
credit_card_detail = CreditCardViewSet.as_view({"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"})


urlpatterns = [
    path("bank-accounts/", bank_account_list, name="bank-account-list"),
    path("bank-accounts/<int:pk>/", bank_account_detail, name="bank-account-detail"),
    path("credit-cards/", credit_card_list, name="credit-card-list"),
    path("credit-cards/<int:pk>/", credit_card_detail, name="credit-card-detail"),
    path("loans/", LoanListCreateView.as_view(), name="loan-list-create"),
    path("loans/<int:pk>/", LoanRetrieveUpdateDestroyView.as_view(), name="loan-detail"),
    path("", include(select_option_url)),
    path("invoice_group/", include(invoice_group_url)),
    path("", include(invoice_user_url)),
    path("", include(transaction_url)),
    path("", include(invoice_url)),
    path("", include(commom_url)),
]
