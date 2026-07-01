# CORS Plugin

`CORSPlugin` is a plugin for oRPC that allows you to configure CORS for your API.

## Basic

```ts
import { CORSPlugin } from "@orpc/server/plugins";

const handler = new RPCHandler(router, {
  plugins: [
    new CORSPlugin({
      origin: (origin, options) => origin,
      allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
      // ...
    }),
  ],
});
```

::: info
The `handler` can be any supported oRPC handler, such as [RPCHandler](/docs/rpc-handler), [OpenAPIHandler](/docs/openapi/openapi-handler), or another custom handler.
:::

---

---

url: /docs/openapi/advanced/customizing-error-response.md
description: >-
Learn how to customize the error response format in oRPC OpenAPI to match your
application's requirements and improve client compatibility.

---
