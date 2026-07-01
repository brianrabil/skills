import { ArrowRight, Network } from "lucide-react";
import Link from "next/link";
import ClaudeCode from "@thesvg/react/claude-code";
import Codex from "@thesvg/react/codex";
import Cursor from "@thesvg/react/cursor";
import Github from "@thesvg/react/github";
import Windsurf from "@thesvg/react/windsurf";
import Zed from "@thesvg/react/zed";
import type { CSSProperties, ComponentType, ReactNode } from "react";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Snippet,
  SnippetAddon,
  SnippetCopyButton,
  SnippetInput,
  SnippetText,
} from "@workspace/ui/components/snippet";
import { docsRoute, gitConfig } from "@/lib/shared";

const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;
const installCommand = `npx skills add ${gitConfig.user}/${gitConfig.repo}`;

// `mono` variants ship unfilled paths and zed hardcodes white fills, so the
// strip forces fill-current at both the svg root and path level (CSS beats
// SVG presentation attributes) to stay theme-adaptive.
const agentIconClass = "size-4 fill-current [&_path]:fill-current";

const agents: { name: string; icon: ReactNode }[] = [
  { name: "Claude Code", icon: <ClaudeCode variant="mono" className={agentIconClass} /> },
  { name: "Cursor", icon: <Cursor variant="mono" className={agentIconClass} /> },
  { name: "Codex", icon: <Codex className={agentIconClass} /> },
  { name: "Windsurf", icon: <Windsurf variant="mono" className={agentIconClass} /> },
  { name: "Zed", icon: <Zed className={agentIconClass} /> },
];

type Skill = {
  name: string;
  slug: string;
  tag: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
};

const skills: Skill[] = [
  {
    name: "oRPC",
    slug: "libraries/orpc",
    tag: "Mirrors official docs",
    icon: Network,
    description:
      "Build, consume, and debug oRPC APIs: procedures, routers, contracts, OpenAPI, and framework adapters.",
  },
];

const gridBackground: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
  backgroundSize: "56px 56px",
  maskImage: "radial-gradient(ellipse 70% 60% at 30% 0%, black 30%, transparent 100%)",
  WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 30% 0%, black 30%, transparent 100%)",
};

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
      {children}
    </p>
  );
}

export default function HomePage() {
  return (
    <>
      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={gridBackground}
          />
          <div className="mx-auto w-full max-w-6xl px-4 py-16 lg:py-20">
            <div className="flex max-w-2xl flex-col items-start gap-6 text-left">
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Stop letting your coding agent guess
              </h1>
              <p className="max-w-lg text-lg text-balance text-muted-foreground">
                Skills give your agent working knowledge of the libraries and workflows you actually
                use. Install them all with one command.
              </p>
              <Snippet className="w-full max-w-md" code={installCommand}>
                <SnippetAddon>
                  <SnippetText>$</SnippetText>
                </SnippetAddon>
                <SnippetInput />
                <SnippetAddon align="inline-end">
                  <SnippetCopyButton />
                </SnippetAddon>
              </Snippet>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="h-11 cursor-pointer px-6 text-[0.95rem]">
                  <Link href={docsRoute}>
                    Browse skills
                    <ArrowRight />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-11 cursor-pointer px-6 text-[0.95rem]"
                >
                  <Link href={githubUrl} target="_blank" rel="noreferrer">
                    <Github variant="mono" className="size-4" fill="currentColor" />
                    View on GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Compatible agents strip */}
        <section className="border-b border-border">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-4 text-sm">
            <span className="text-xs font-medium text-muted-foreground">Works with</span>
            {agents.map(({ name, icon }) => (
              <span
                key={name}
                className="inline-flex items-center gap-1.5 font-medium text-foreground/80"
              >
                {icon}
                {name}
              </span>
            ))}
            <span className="text-muted-foreground">70+ more</span>
          </div>
        </section>

        {/* Skills catalog */}
        <section>
          <div className="mx-auto w-full max-w-5xl px-4 py-20">
            <div className="mb-10 flex flex-col gap-2">
              <Eyebrow>The collection</Eyebrow>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Browse the skills
              </h2>
              <p className="max-w-lg text-muted-foreground">
                Library skills mirror official docs, so your agent works from the real API instead
                of a hazy memory of it. My own custom skills land next.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map(({ name, slug, tag, description, icon: Icon }) => (
                <Link
                  key={slug}
                  href={`${docsRoute}/${slug}`}
                  className="group/skill rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Card className="h-full transition-all group-hover/skill:ring-foreground/20 motion-reduce:transition-none">
                    <CardHeader>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="inline-flex size-9 items-center justify-center rounded-lg bg-muted text-foreground">
                          <Icon className="size-4.5" />
                        </span>
                        <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                          {tag}
                        </span>
                      </div>
                      <CardTitle className="flex items-center gap-1.5">
                        {name}
                        <ArrowRight className="size-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover/skill:translate-x-0 group-hover/skill:opacity-100 motion-reduce:transition-none" />
                      </CardTitle>
                      <CardDescription>{description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
              <Card className="border-dashed bg-transparent ring-0 ring-transparent">
                <CardContent className="flex h-full flex-col items-center justify-center gap-1 py-8 text-center text-muted-foreground">
                  <p className="text-sm font-medium">More skills in progress</p>
                  <p className="text-xs">
                    Check back soon, or scaffold your own with{" "}
                    <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.7rem] text-foreground">
                      npx skills init
                    </code>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-start gap-6 px-4 py-16 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                Add a skill to your next project
              </h2>
              <p className="max-w-sm text-muted-foreground">
                One command installs everything. Your agent loads a skill only when the task calls
                for it.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">
              <Snippet className="w-full sm:w-96" code={installCommand}>
                <SnippetAddon>
                  <SnippetText>$</SnippetText>
                </SnippetAddon>
                <SnippetInput />
                <SnippetAddon align="inline-end">
                  <SnippetCopyButton />
                </SnippetAddon>
              </Snippet>
              <Button asChild size="lg" className="h-11 cursor-pointer px-6 text-[0.95rem]">
                <Link href={docsRoute}>
                  Browse skills
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>MIT licensed. Built by Brian Rabil.</p>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link className="transition-colors hover:text-foreground" href={docsRoute}>
              Docs
            </Link>
            <Link
              className="transition-colors hover:text-foreground"
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </Link>
            <Link
              className="transition-colors hover:text-foreground"
              href={`https://skills.sh/${gitConfig.user}/${gitConfig.repo}`}
              target="_blank"
              rel="noreferrer"
            >
              skills.sh
            </Link>
            <Link
              className="transition-colors hover:text-foreground"
              href="https://agentskills.io"
              target="_blank"
              rel="noreferrer"
            >
              Agent Skills spec
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
