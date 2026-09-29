"""Login route — entry point for authentication."""
from flask import Blueprint, request, jsonify
from .services.auth_service import AuthService
from .store.tokens import TokenStore

auth_bp = Blueprint("auth", __name__)
token_store = TokenStore()


@auth_bp.route("/login", methods=["POST"])
def login():
    body = request.get_json(force=True)
    email = body.get("email")
    password = body.get("password")

    service = AuthService(token_store)
    session = service.authenticate(email, password)

    if session is None:
        return jsonify({"error": "invalid_credentials"}), 401

    return jsonify({"token": session.token, "user_id": session.user_id}), 200
