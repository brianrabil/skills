import { ArrowRight, Network } from "lucide-react";
import Link from "next/link";
import Github from "@thesvg/react/github";
import type { CSSProperties, ComponentType } from "react";
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

const agents = ["Claude Code", "Cursor", "Codex", "Windsurf", "Zed", "70+ more"];

const installTree = [
  ".agents/",
  "└── skills/",
  "    └── orpc/",
  "        └── SKILL.md",
  "",
  "# plus a symlink for your agent:",
  "# .claude/skills, .cursor/skills, …",
].join("\n");

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
    slug: "orpc",
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
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={gridBackground}
        />
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div className="flex flex-col items-start gap-6 text-left">
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Give your coding agent real expertise
            </h1>
            <p className="max-w-lg text-lg text-balance text-muted-foreground">
              A personal collection of reusable instructions for Claude Code, Cursor, Codex, and 70+
              other coding agents, installed with one command.
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
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="border-b border-border px-4 py-2.5 text-xs text-muted-foreground">
              What gets installed
            </div>
            <pre className="overflow-x-auto px-4 py-4 font-mono text-[0.8rem] leading-relaxed text-foreground/90">
              {installTree}
            </pre>
          </div>
        </div>
      </section>

      {/* Compatible agents strip */}
      <section className="border-b border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-3 gap-y-1 px-4 py-4 text-sm text-muted-foreground">
          <span className="text-xs font-medium text-muted-foreground">Works with</span>
          {agents.map((agent) => (
            <span key={agent} className="font-medium text-foreground/80">
              {agent}
            </span>
          ))}
        </div>
      </section>

      {/* Skills catalog */}
      <section>
        <div className="mx-auto w-full max-w-5xl px-4 py-20">
          <div className="mb-10 flex flex-col gap-2">
            <Eyebrow>The collection</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Browse the skills</h2>
            <p className="max-w-lg text-muted-foreground">
              One published skill so far, with more on the way.
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
              Install the whole collection in seconds. It works with whatever agent you already run.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">
            <Snippet className="w-full sm:w-72" code={installCommand}>
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
  );
}
