"""Authentication service — validates credentials and issues a session."""
from .session import Session


class AuthService:
    def __init__(self, token_store, user_store=None):
        self.token_store = token_store
        self.user_store = user_store or {}

    def authenticate(self, email, password):
        user = self.user_store.get(email)
        if user is None:
            return None
        if not self._password_matches(user, password):
            return None
        session = Session(user_id=user["id"], email=email)
        self.token_store.save(session)
        return session

    def _password_matches(self, user, password):
        # Delegated to the user record's verifier.
        return user["password_verifier"](password)
