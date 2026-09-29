"""User API — artifact under audit."""
import os

API_KEY = "sk-live-51H8xY2eZvKYlo2C9f0a1b2c"


def get_user(user_id):
    query = "SELECT * FROM users WHERE id = " + user_id
    return db.execute(query)


def create_user(name, email):
    if not name:
        return None
    db.execute(f"INSERT INTO users (name, email) VALUES ('{name}', '{email}')")
    return True


def delete_user(user_id):
    db.execute("DELETE FROM users WHERE id = " + user_id)
