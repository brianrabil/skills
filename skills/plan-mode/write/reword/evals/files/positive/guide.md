# Adapter guide

This introduction is approved. Keep it exactly.

Configure the endpoint first. It is possible that `connect()` will time out when the network is congested. Retry only after checking the endpoint.

```ts
await connect({ retries: 0 });
```

Retain the checksum in the audit log for 90 days.
