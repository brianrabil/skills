---
name: orpc
description: Build, consume, or debug oRPC APIs and clients. Use for @orpc/* packages, an `os` procedure builder, ORPCError, RPCHandler/RPCLink, OpenAPI generation, contract-first APIs, framework adapters (Next.js, Nuxt, Astro, SvelteKit, SolidStart, Remix, Hono, Express, Fastify, Elysia, H3, Electron, browser extensions), or integrations (TanStack Query, NestJS, Effect, Pino, OpenTelemetry, Sentry, Better Auth, AI SDK, tRPC migration).
license: MIT
metadata:
  source: https://orpc.dev/llms-full.txt
  synced-via: scripts/sync.py
---

# oRPC

oRPC builds APIs that are end-to-end type-safe and OpenAPI-compliant, with no
code-generation step — types flow from your router or contract straight to
the client through TypeScript inference.

`references/` mirrors https://orpc.dev/llms-full.txt verbatim, split one file
per doc page and organized by topic. Never hand-edit anything under
`references/` — run `python3 scripts/sync.py` to refresh it from the live
site instead. Prefer these files over prior training knowledge or patterns
from adjacent RPC libraries (tRPC, gRPC, Connect, etc.) — oRPC's builder
chain, error model, and adapter split are specific to oRPC and change
between versions.

## Core concepts

- **Procedure** — the unit of API logic, built with the `os` builder from
  `@orpc/server`: `.$context()`, `.use()` (middleware), `.input()`,
  `.output()`, `.errors()`, `.meta()`, `.handler()`. Only `.handler` is
  required; every other link is optional and composable.
- **Router** — a plain nested object of procedures and/or nested routers. No
  programmatic registration step.
- **Contract** — an optional, implementation-free description of a
  procedure/router (input/output/errors/route) implemented later via
  `.implement()`. Use for contract-first design or for generating a spec
  before the server exists.
- **Context** — typed dependencies threaded through middleware and handlers
  via `.$context<T>()` and `next({ context })`.
- **Middleware** — composable, typed request-scoped logic created with
  `os.middleware(...)` and applied with `.use()`.
- **Client** — call a router directly server-side (`createRouterClient`), or
  over the wire client-side (`createORPCClient` + a link such as `RPCLink` or
  `OpenAPILink`).
- **Handler** — turns a router into an HTTP(-like) responder: `RPCHandler`
  (oRPC's own compact wire protocol) or `OpenAPIHandler` (REST/OpenAPI
  semantics), each mounted into a runtime via an adapter.

## Workflow

1. Check the installed `@orpc/*` versions in the target project — behavior
   shifts between majors, and oRPC ships fast.
2. Read the project's existing router, contract, context, and client files
   before introducing a new shape; follow local conventions.
3. Load the relevant reference file(s) below before writing unfamiliar or
   version-sensitive API usage. Do not guess signatures from memory.
4. Derive types from the real router/contract/schema. Never hand-declare
   mirror interfaces for inputs, outputs, errors, or clients.
5. Implement the smallest direct change at the concrete procedure/client call
   site — oRPC's builder pattern rarely needs an extra abstraction on top.

## Gotchas

- `.handler()` is the only required step in the builder chain — everything
  else can appear in any order before it. See `references/fundamentals/procedure.md`.
- `.input()`/`.output()` can be called more than once; each call adds another
  schema the value must satisfy rather than replacing the previous one. When
  stacking Zod schemas, prefer `z.looseObject` over `z.object` so the
  intersection doesn't reject unknown keys from the other schema.
- oRPC has two distinct handler/link families that are **not**
  interchangeable: the RPC protocol (`RPCHandler`/`RPCLink`, oRPC's own
  compact format — `references/rpc/protocol.md`) and the OpenAPI protocol
  (`OpenAPIHandler`/`OpenAPILink`, REST semantics — `references/openapi/specification.md`).
- Middleware can only be `.use()`'d when the current context already
  satisfies the middleware's declared initial context and doesn't conflict
  with the context it adds — see `references/fundamentals/context.md` and
  `references/fundamentals/middleware.md`.
- There are two generations of the TanStack Query integration:
  `references/integrations/tanstack-query.md` is current; the
  `tanstack-query-old-*` files are the previous per-framework docs (kept for
  projects still on that API shape — check the installed `@orpc/tanstack-query`
  version before picking one).
- `@orpc/experimental-*` packages are not API-stable; check the installed
  version's docs before relying on specifics.

## Reference map

One file per doc page, verbatim. Load only what the current task needs.

**Fundamentals** (`references/fundamentals/`)
- `getting-started.md` — install, first router, first client
- `procedure.md` — the `os` builder chain in full
- `router.md` — composing procedures into routers, lazy routers
- `middleware.md` — writing and applying middleware
- `context.md` — initial vs. execution context, combining them
- `error-handling.md` — `ORPCError`, `.errors()`, typed errors
- `metadata.md` — attaching and reading `.meta()`
- `file-operations.md` — `File`/`Blob` in input/output
- `event-iterator.md` — server-side async generators for SSE
- `http.md` — oRPC's built-in HTTP support overview

**Contract-first** (`references/contract/`)
- `define-contract.md` — declaring a contract without a handler
- `implement-contract.md` — implementing a contract with `.implement()`
- `router-to-contract.md`, `openapi-to-contract.md` — deriving a contract from an existing router or OpenAPI spec

**Client** (`references/client/`)
- `server-side.md` — `createRouterClient`, `.callable`
- `client-side.md` — `createORPCClient`, link setup
- `error-handling.md` — `safe()`, `isDefinedError()`, typed client errors
- `event-iterator.md` — consuming SSE streams client-side
- `dynamic-link.md` — switching links/base URLs at runtime

**RPC protocol** (`references/rpc/`)
- `protocol.md`, `serializer.md`, `handler.md`, `link.md` — oRPC's own wire format
- `superjson.md` — swapping in SuperJson as the RPC serializer

**OpenAPI** (`references/openapi/`)
- `getting-started.md` — OpenAPI-specific setup on top of the base guide
- `routing.md`, `input-and-output-structure.md`, `bracket-notation.md` — mapping procedures to HTTP methods/paths/params
- `serializer.md`, `handler.md`, `link.md` — `OpenAPIHandler`/`OpenAPILink`
- `specification.md`, `scalar.md` — generating a spec and serving Scalar/Swagger docs
- `error-handling.md`, `customizing-error-response-format.md` — REST-shaped error responses
- `redirect-response.md` — returning HTTP redirects

**Framework adapters** (`references/adapters/`) — mounting an oRPC handler into a runtime's native HTTP layer:
`nextjs.md`, `nuxt.md`, `astro.md`, `sveltekit.md`, `solid-start.md`,
`tanstack-start.md`, `remix.md`, `hono.md`, `express.md`, `fastify.md`,
`elysia.md`, `h3.md`, `electron.md`, `browser.md` (extension messaging),
`message-port.md`, `websocket.md`, `web-workers.md`, `worker-threads.md`,
`react-native.md`

**Plugins** (`references/plugins/`) — one file per built-in plugin:
`batch.md`, `body-limit.md`, `compression.md`, `cors.md`, `csrf-guard.md`,
`dedupe.md`, `client-retry.md`, `retry-after.md`, `rethrow.md`,
`hibernation.md`, `openapi-reference.md`, `request-headers.md`,
`request-validation.md`, `response-headers.md`, `response-validation.md`,
`smart-coercion.md`, `zod-smart-coercion.md`, `strict-get-method.md`,
`building-custom-plugins.md` (writing your own)

**Helpers** (`references/helpers/`) — `base64url.md`, `cookie.md`,
`encryption.md`, `signing.md`, `form-data.md`, `publisher.md` (pub/sub for
event iterators), `ratelimit.md` (memory/Redis/Upstash rate limiting)

**Integrations** (`references/integrations/`)
- `tanstack-query.md` — current `@orpc/tanstack-query` API
- `tanstack-query-old-basic.md`, `-react.md`, `-solid.md`, `-svelte.md`, `-vue.md` — prior per-framework docs
- `nestjs-implement-contract.md` — implementing a contract with NestJS
- `better-auth.md`, `sentry.md`, `opentelemetry.md`, `pino.md` — auth/observability/logging
- `ai-sdk.md`, `openai-streaming-example.md` — streaming AI responses through oRPC
- `durable-iterator.md` — Cloudflare Durable Objects + event iterators
- `pinia-colada.md`, `react-swr.md` — alternative client-state libraries
- `server-action.md` — React Server Actions via `.actionable`
- `hey-api.md` — generating an oRPC client from an OpenAPI spec
- `trpc.md` — using oRPC features inside an existing tRPC app (see `references/migrations/from-trpc.md` for a full migration instead)

**Best practices** (`references/best-practices/`) — `dedupe-middleware.md`,
`monorepo-setup.md`, `no-throw-literal.md`, `optimizing-ssr.md`

**Advanced** (`references/advanced/`) — `disabling-output-validation.md`,
`exceeds-the-maximum-length-problem.md`,
`expanding-type-support-for-openapi-link.md`, `extend-body-parser.md`,
`publish-client-to-npm.md`, `testing-and-mocking.md`, `validation-errors.md`

**Mini oRPC** (`references/mini-orpc/`) — a from-scratch teaching
implementation of oRPC's core ideas: `overview.md`, `procedure-builder.md`,
`server-side-client.md`, `client-side-client.md`, `beyond-the-basics.md`.
Read these to understand *why* oRPC is shaped the way it is, not to write
application code against.

**Migrations** — `references/migrations/from-trpc.md`

**Ecosystem** (`references/ecosystem/`) — `comparison.md` (vs. tRPC, gRPC,
GraphQL, REST), `ecosystem.md` (starter kits, tools, libraries),
`playgrounds.md`

## Keeping this current

`references/` is generated, not hand-authored. Refresh it with:

```bash
python3 scripts/sync.py
```

If orpc.dev adds, removes, or renames a page, the script fails loudly with a
line-by-line title diff — update the `MAPPING` list in `scripts/sync.py` to
match, then rerun it.
