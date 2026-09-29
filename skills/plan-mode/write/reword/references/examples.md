# Contrasting examples

## Reword without changing certainty

Request: “Only reword the second sentence. Preserve `connect()` and uncertainty.”

Before:

> Configure the endpoint first. It is possible that `connect()` will time out when the network is congested. Retry only after checking the endpoint.

Replacement:

> `connect()` may time out when the network is congested.

The first and third sentences remain byte-for-byte unchanged. This removes wordiness, not uncertainty. “`connect()` times out when the network is congested” would make a stronger claim and fails the request.

## Reword versus substantive revision

Before: “Clients must retain the token for 30 days.”

Reword: “Clients must keep the token for 30 days.”

Changing this to “Clients should keep the token for a month” changes both obligation and duration. If the user asks for that wording while requiring unchanged commitments, surface the conflict instead of silently treating it as equivalent.

## Reword versus condense

Before: “Upload the archive after validating its checksum, and retain the checksum in the audit log for 90 days.”

Reword: “Validate the archive's checksum before uploading it, and keep the checksum in the audit log for 90 days.”

“Validate and upload the archive” is condensation that drops the audit-log requirement. It does not satisfy rewording or tightening with requirements preserved.

## Protected text inside the target

Request: “Make this clearer, but keep the quoted error and API name exact.”

Before: “In the event that `connect()` returns \"ECONNRESET\", a retry might succeed.”

Replacement: “If `connect()` returns \"ECONNRESET\", a retry might succeed.”

Changing the identifier to `connectAsync()` or “might” to “will” fails. If the entire sentence is approved/protected, request permission before changing it.

## Ambiguous repeated occurrence

Input includes the same sentence twice, and the user says “reword that sentence” without a selection. Locate the intended occurrence from context; if both remain plausible, ask which one. Never edit both just because exact-match replacement is convenient.
