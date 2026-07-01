#!/usr/bin/env python3
"""Re-sync references/ verbatim from https://orpc.dev/llms-full.txt.

Usage: python3 scripts/sync.py
"""
import os
import urllib.request

SOURCE_URL = 'https://orpc.dev/llms-full.txt'
SKILL_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(SKILL_ROOT, 'references')

# (category, slug) for each top-level page, in the order llms-full.txt emits them.
# Regenerate this list by hand if orpc.dev adds/removes/renames pages -- diff the
# output of `grep -n '^# '` (skipping headings inside fenced code blocks) against
# this mapping.
MAPPING = [
    ('integrations', 'ai-sdk'),
    ('adapters', 'astro'),
    ('helpers', 'base64url'),
    ('plugins', 'batch'),
    ('integrations', 'better-auth'),
    ('mini-orpc', 'beyond-the-basics'),
    ('plugins', 'body-limit'),
    ('openapi', 'bracket-notation'),
    ('adapters', 'browser'),
    ('plugins', 'building-custom-plugins'),
    ('plugins', 'client-retry'),
    ('mini-orpc', 'client-side-client'),
    ('client', 'client-side'),
    ('ecosystem', 'comparison'),
    ('plugins', 'compression'),
    ('fundamentals', 'context'),
    ('helpers', 'cookie'),
    ('plugins', 'cors'),
    ('openapi', 'customizing-error-response-format'),
    ('best-practices', 'dedupe-middleware'),
    ('plugins', 'dedupe'),
    ('contract', 'define-contract'),
    ('advanced', 'disabling-output-validation'),
    ('integrations', 'durable-iterator'),
    ('client', 'dynamic-link'),
    ('ecosystem', 'ecosystem'),
    ('adapters', 'electron'),
    ('adapters', 'elysia'),
    ('helpers', 'encryption'),
    ('fundamentals', 'error-handling'),
    ('client', 'error-handling'),
    ('fundamentals', 'event-iterator'),
    ('client', 'event-iterator'),
    ('advanced', 'exceeds-the-maximum-length-problem'),
    ('advanced', 'expanding-type-support-for-openapi-link'),
    ('adapters', 'express'),
    ('advanced', 'extend-body-parser'),
    ('adapters', 'fastify'),
    ('fundamentals', 'file-operations'),
    ('helpers', 'form-data'),
    ('fundamentals', 'getting-started'),
    ('openapi', 'getting-started'),
    ('adapters', 'h3'),
    ('integrations', 'hey-api'),
    ('plugins', 'hibernation'),
    ('adapters', 'hono'),
    ('fundamentals', 'http'),
    ('contract', 'implement-contract'),
    ('integrations', 'nestjs-implement-contract'),
    ('openapi', 'input-and-output-structure'),
    ('adapters', 'message-port'),
    ('fundamentals', 'metadata'),
    ('fundamentals', 'middleware'),
    ('migrations', 'from-trpc'),
    ('best-practices', 'monorepo-setup'),
    ('adapters', 'nextjs'),
    ('best-practices', 'no-throw-literal'),
    ('adapters', 'nuxt'),
    ('integrations', 'openai-streaming-example'),
    ('openapi', 'error-handling'),
    ('openapi', 'handler'),
    ('openapi', 'serializer'),
    ('plugins', 'openapi-reference'),
    ('openapi', 'routing'),
    ('openapi', 'specification'),
    ('contract', 'openapi-to-contract'),
    ('openapi', 'link'),
    ('integrations', 'opentelemetry'),
    ('best-practices', 'optimizing-ssr'),
    ('mini-orpc', 'overview'),
    ('integrations', 'pinia-colada'),
    ('integrations', 'pino'),
    ('ecosystem', 'playgrounds'),
    ('fundamentals', 'procedure'),
    ('mini-orpc', 'procedure-builder'),
    ('advanced', 'publish-client-to-npm'),
    ('helpers', 'publisher'),
    ('helpers', 'ratelimit'),
    ('adapters', 'react-native'),
    ('integrations', 'react-swr'),
    ('openapi', 'redirect-response'),
    ('adapters', 'remix'),
    ('plugins', 'request-headers'),
    ('plugins', 'request-validation'),
    ('plugins', 'response-headers'),
    ('plugins', 'response-validation'),
    ('plugins', 'rethrow'),
    ('plugins', 'retry-after'),
    ('fundamentals', 'router'),
    ('contract', 'router-to-contract'),
    ('rpc', 'handler'),
    ('rpc', 'serializer'),
    ('rpc', 'protocol'),
    ('rpc', 'link'),
    ('openapi', 'scalar'),
    ('integrations', 'sentry'),
    ('integrations', 'server-action'),
    ('mini-orpc', 'server-side-client'),
    ('client', 'server-side'),
    ('helpers', 'signing'),
    ('plugins', 'csrf-guard'),
    ('plugins', 'smart-coercion'),
    ('adapters', 'solid-start'),
    ('plugins', 'strict-get-method'),
    ('rpc', 'superjson'),
    ('adapters', 'sveltekit'),
    ('integrations', 'tanstack-query'),
    ('integrations', 'tanstack-query-old-basic'),
    ('integrations', 'tanstack-query-old-react'),
    ('integrations', 'tanstack-query-old-solid'),
    ('integrations', 'tanstack-query-old-svelte'),
    ('integrations', 'tanstack-query-old-vue'),
    ('adapters', 'tanstack-start'),
    ('advanced', 'testing-and-mocking'),
    ('integrations', 'trpc'),
    ('advanced', 'validation-errors'),
    ('adapters', 'web-workers'),
    ('adapters', 'websocket'),
    ('adapters', 'worker-threads'),
    ('plugins', 'zod-smart-coercion'),
]


def find_pages(lines):
    in_fence = False
    pages = []
    for i, line in enumerate(lines):
        stripped = line.rstrip('\n')
        if stripped.strip().startswith('```'):
            in_fence = not in_fence
            continue
        if not in_fence and stripped.startswith('# '):
            pages.append((i, stripped[2:].strip()))
    return pages


def main():
    request = urllib.request.Request(SOURCE_URL, headers={'User-Agent': 'curl/8.0'})
    with urllib.request.urlopen(request) as response:
        text = response.read().decode('utf-8')
    lines = text.splitlines(keepends=True)
    pages = find_pages(lines)

    if len(pages) != len(MAPPING):
        raise SystemExit(
            f'orpc.dev now has {len(pages)} pages but MAPPING has {len(MAPPING)}. '
            'Diff the page titles below against MAPPING and update it by hand:\n'
            + '\n'.join(f'{i}: {title}' for i, (_, title) in enumerate(pages))
        )

    for idx, ((start, _title), (category, slug)) in enumerate(zip(pages, MAPPING)):
        end = pages[idx + 1][0] if idx + 1 < len(pages) else len(lines)
        body = lines[start:end]
        while body and body[-1].strip() == '':
            body.pop()
        out_dir = os.path.join(OUT, category)
        os.makedirs(out_dir, exist_ok=True)
        with open(os.path.join(out_dir, slug + '.md'), 'w') as f:
            f.write(''.join(body) + '\n')

    print(f'Synced {len(MAPPING)} pages from {SOURCE_URL} into {OUT}')


if __name__ == '__main__':
    main()
