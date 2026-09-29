# Auth system

## Login flow

1. `POST /login` hits `routes/login.py:login`.
2. `login` extracts `email` and `password` from the JSON body.
3. It constructs an `AuthService` with the shared `TokenStore` and calls
   `authenticate(email, password)`.
4. `AuthService.authenticate` looks up the user, verifies the password, builds a
   `Session`, saves it through the `TokenStore`, and returns it.
5. `login` responds with the session `token` and `user_id`, or `401` when the
   service returns `None`.

## Token validation flow

1. `middleware/session.py:make_session_middleware` runs before each protected
   request.
2. It reads the `Authorization` header and strips the `Bearer ` prefix.
3. It loads the session from the `TokenStore` by token and stores it on `g`.

## Notes

- The `TokenStore` is in-memory; a restart drops every session.
- `Session.token` is generated with `secrets.token_urlsafe(32)`.
- The password verifier is delegated to the user record, not implemented here.
