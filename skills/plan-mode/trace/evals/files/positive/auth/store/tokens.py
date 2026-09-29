"""Token store — persists sessions keyed by token."""


class TokenStore:
    def __init__(self):
        self._by_token = {}

    def save(self, session):
        self._by_token[session.token] = session

    def load(self, token):
        return self._by_token.get(token)

    def revoke(self, token):
        self._by_token.pop(token, None)
