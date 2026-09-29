# API standard

Every endpoint in this codebase must satisfy the following.

## Input validation

- All user-supplied input is validated before use. No request reaches the
  database without validation.
- Identifiers are bound as parameters, never concatenated into a query.

## Secrets

- No secret is hardcoded in source. Secrets come from the environment or a
  secrets manager.
- A secret committed to the repository is a critical violation.

## Error handling

- Every database operation is wrapped so a failure returns a controlled error,
  not an unhandled exception.
- A failure never exposes a raw query or stack trace to the caller.

## Return values

- A function returns a value the caller can act on. Returning `None` silently
  on invalid input is a violation.
