# Body Limit Plugin

The **Body Limit Plugin** restricts the size of the request body.

## Import

Depending on your adapter, import the corresponding plugin:

```ts
import { BodyLimitPlugin } from '@orpc/server/fetch'
import { BodyLimitPlugin } from '@orpc/server/node'
```

## Setup

Configure the plugin with your desired maximum body size:

```ts
const handler = new RPCHandler(router, {
  plugins: [
    new BodyLimitPlugin({
      maxBodySize: 1024 * 1024, // 1MB
    }),
  ],
})
```

::: info
The `handler` can be any supported oRPC handler, such as [RPCHandler](/docs/rpc-handler), [OpenAPIHandler](/docs/openapi/openapi-handler), or another custom handler.
:::

---

---
url: /docs/openapi/bracket-notation.md
description: >-
  Represent structured data in limited formats such as URL queries and form
  data.
---

