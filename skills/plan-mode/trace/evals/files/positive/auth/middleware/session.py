"""Session middleware — validates the bearer token on protected routes."""
from flask import request, g
from .store.tokens import TokenStore


def make_session_middleware(token_store: TokenStore):
    def middleware():
        header = request.headers.get("Authorization", "")
        if not header.startswith("Bearer "):
            g.session = None
            return
        token = header[len("Bearer "):]
        g.session = token_store.load(token)

    return middleware
