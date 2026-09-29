"""Session value object."""
import secrets


class Session:
    def __init__(self, user_id, email):
        self.user_id = user_id
        self.email = email
        self.token = secrets.token_urlsafe(32)
