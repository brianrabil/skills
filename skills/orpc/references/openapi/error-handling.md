# OpenAPI Error Handling

Before you begin, please review our [Error Handling](/docs/error-handling) guide. This document shows you how to align your error responses with OpenAPI standards.

## Default Error Mappings

By default, oRPC maps common error codes to standard HTTP status codes:

| Error Code             | HTTP Status Code | Message                |
| ---------------------- | ---------------: | ---------------------- |
| BAD\_REQUEST            |              400 | Bad Request            |
| UNAUTHORIZED           |              401 | Unauthorized           |
| FORBIDDEN              |              403 | Forbidden              |
| NOT\_FOUND              |              404 | Not Found              |
| METHOD\_NOT\_SUPPORTED   |              405 | Method Not Supported   |
| NOT\_ACCEPTABLE         |              406 | Not Acceptable         |
| TIMEOUT                |              408 | Request Timeout        |
| CONFLICT               |              409 | Conflict               |
| PRECONDITION\_FAILED    |              412 | Precondition Failed    |
| PAYLOAD\_TOO\_LARGE      |              413 | Payload Too Large      |
| UNSUPPORTED\_MEDIA\_TYPE |              415 | Unsupported Media Type |
| UNPROCESSABLE\_CONTENT  |              422 | Unprocessable Content  |
| TOO\_MANY\_REQUESTS      |              429 | Too Many Requests      |
| CLIENT\_CLOSED\_REQUEST  |              499 | Client Closed Request  |
| INTERNAL\_SERVER\_ERROR  |              500 | Internal Server Error  |
| NOT\_IMPLEMENTED        |              501 | Not Implemented        |
| BAD\_GATEWAY            |              502 | Bad Gateway            |
| SERVICE\_UNAVAILABLE    |              503 | Service Unavailable    |
| GATEWAY\_TIMEOUT        |              504 | Gateway Timeout        |

Any error not defined above defaults to HTTP status `500` with the error code used as the message.

## Customizing Errors

You can override the default mappings by specifying a custom `status` and `message` when creating an error:

```ts
const example = os
  .errors({
    RANDOM_ERROR: {
      status: 503, // <-- override default status
      message: 'Default error message', // <-- override default message
    },
  })
  .handler(() => {
    throw new ORPCError('ANOTHER_RANDOM_ERROR', {
      status: 502, // <-- override default status
      message: 'Custom error message', // <-- override default message
    })
  })
```

---

---
url: /docs/openapi/openapi-handler.md
description: Comprehensive Guide to the OpenAPIHandler in oRPC
---

