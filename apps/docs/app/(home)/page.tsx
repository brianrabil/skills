import ClaudeCode from "@thesvg/react/claude-code";
import Codex from "@thesvg/react/codex";
import Cursor from "@thesvg/react/cursor";
import Github from "@thesvg/react/github";
import Windsurf from "@thesvg/react/windsurf";
import Zed from "@thesvg/react/zed";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  FileText,
  Megaphone,
  PenLine,
  Terminal,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  Snippet,
  SnippetAddon,
  SnippetCopyButton,
  SnippetInput,
  SnippetText,
} from "@/components/ui/snippet";
import { docsRoute, gitConfig } from "@/lib/shared";

const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;
const installCommand = `npx skills add ${gitConfig.user}/${gitConfig.repo}`;

const agentIconClass = "size-4 fill-current [&_path]:fill-current";

const agents: { name: string; icon: ReactNode }[] = [
  {
    name: "Claude Code",
    icon: <ClaudeCode aria-hidden="true" variant="mono" className={agentIconClass} />,
  },
  {
    name: "Cursor",
    icon: <Cursor aria-hidden="true" variant="mono" className={agentIconClass} />,
  },
  { name: "Codex", icon: <Codex aria-hidden="true" className={agentIconClass} /> },
  {
    name: "Windsurf",
    icon: <Windsurf aria-hidden="true" variant="mono" className={agentIconClass} />,
  },
  { name: "Zed", icon: <Zed aria-hidden="true" className={agentIconClass} /> },
];

const collections = [
  {
    index: "01",
    name: "Plan Mode",
    href: `${docsRoute}/plan-mode`,
    count: 35,
    icon: Workflow,
    description:
      "Research, clarify, decide, plan, review, and hand work off without losing the thread.",
    example: "plan-mode-research",
  },
  {
    index: "02",
    name: "Writing",
    href: `${docsRoute}/writing`,
    count: 9,
    icon: PenLine,
    description:
      "Move from raw fragments to a verified draft with distinct skills for every editorial stage.",
    example: "writing-revise",
  },
  {
    index: "03",
    name: "Marketkit",
    href: `${docsRoute}/marketkit`,
    count: 7,
    icon: Megaphone,
    description:
      "Plan a campaign, produce channel-ready assets, schedule the work, and verify publication.",
    example: "marketkit-to-campaign",
  },
];

const standaloneSkills = [
  {
    name: "create-rule",
    href: `${docsRoute}/create-rule`,
    description: "Turn a working preference into durable agent guidance.",
  },
  {
    name: "docs-to-skill",
    href: `${docsRoute}/docs-to-skill`,
    description: "Package product documentation into a focused local skill.",
  },
];

const steps = [
  {
    number: "01",
    title: "Install Once",
    description: "Add the full collection or select one exact skill by name.",
    icon: Terminal,
  },
  {
    number: "02",
    title: "Load on Demand",
    description: "Your agent activates only the instructions relevant to the current task.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Work With Context",
    description: "The agent follows a tested workflow instead of inventing one mid-task.",
    icon: Check,
  },
];

export default function HomePage() {
  return (
    <>
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-50 -translate-y-20 rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background transition-transform duration-150 ease-out focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Skip to Main Content
      </a>

      <div id="main-content" className="flex flex-1 flex-col overflow-x-hidden">
        <section
          aria-labelledby="hero-heading"
          className="relative isolate overflow-hidden border-b border-border"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_92%)]"
          />
          <div
            aria-hidden="true"
            className="absolute -top-32 left-[52%] -z-10 size-[34rem] rounded-full bg-lime-400/15 blur-3xl dark:bg-lime-400/10"
          />

          <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
            <div className="flex max-w-3xl flex-col items-start">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-600/25 bg-lime-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-lime-800 uppercase dark:border-lime-300/20 dark:text-lime-300">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
                53 Skills · Open Source
              </div>

              <h1
                id="hero-heading"
                className="max-w-3xl text-5xl leading-[0.94] font-semibold tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl"
              >
                Give your agent the{" "}
                <span className="text-lime-700 dark:text-lime-400">missing manual.</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-pretty text-muted-foreground sm:text-xl">
                Practical workflows for coding, planning, writing, and marketing—built to replace
                guesswork with repeatable execution.
              </p>

              <Snippet
                className="mt-8 h-12 w-full max-w-xl border-foreground/15 bg-background/80 shadow-sm backdrop-blur-sm"
                code={installCommand}
              >
                <SnippetAddon>
                  <SnippetText className="text-lime-700 dark:text-lime-400">$</SnippetText>
                </SnippetAddon>
                <SnippetInput aria-label="Install all 53 skills" className="text-sm sm:text-base" />
                <SnippetAddon align="inline-end">
                  <SnippetCopyButton />
                </SnippetAddon>
              </Snippet>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={docsRoute}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-5 text-sm font-semibold text-background transition-[color,background-color,transform] duration-150 ease-out hover:bg-foreground/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] motion-reduce:transition-none"
                >
                  Explore 53 Skills
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-background/70 px-5 text-sm font-semibold transition-[color,background-color,border-color,transform] duration-150 ease-out hover:border-foreground/25 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] motion-reduce:transition-none"
                >
                  <Github
                    aria-hidden="true"
                    variant="mono"
                    className="size-4"
                    fill="currentColor"
                  />
                  View on GitHub
                  <ArrowUpRight aria-hidden="true" className="size-3.5 text-muted-foreground" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Compatible coding agents" className="border-b border-border">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-5 sm:px-8 md:flex-row md:items-center lg:px-10">
            <p className="shrink-0 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              Works Where You Work
            </p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-foreground/75">
              {agents.map(({ name, icon }) => (
                <li key={name} className="inline-flex items-center gap-1.5 font-medium">
                  {icon}
                  {name}
                </li>
              ))}
              <li className="text-muted-foreground">70+ compatible agents</li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="collections-heading" className="border-b border-border">
          <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-lime-700 uppercase dark:text-lime-400">
                  The Collection
                </p>
                <h2
                  id="collections-heading"
                  className="mt-3 max-w-md text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-4xl"
                >
                  A workflow for the work that matters.
                </h2>
                <p className="mt-4 max-w-md leading-7 text-pretty text-muted-foreground">
                  Start with a complete collection or install one narrowly scoped skill. Every skill
                  has a clear trigger, process, and output contract.
                </p>
              </div>

              <ul className="grid gap-4 md:grid-cols-3">
                {collections.map(
                  ({ index, name, href, count, icon: Icon, description, example }) => (
                    <li key={name}>
                      <Link
                        href={href}
                        className="group flex h-full min-h-72 flex-col rounded-2xl border border-border bg-card p-5 transition-[border-color,background-color,transform] duration-200 ease-out hover:-translate-y-1 hover:border-lime-600/40 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-muted-foreground">{index}</span>
                          <Icon
                            aria-hidden="true"
                            className="size-5 text-lime-700 dark:text-lime-400"
                          />
                        </div>
                        <div className="mt-12">
                          <p className="font-mono text-xs text-muted-foreground">{count} skills</p>
                          <h3 className="mt-1 text-xl font-semibold tracking-tight">{name}</h3>
                          <p className="mt-3 text-sm leading-6 text-pretty text-muted-foreground">
                            {description}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between gap-3 pt-8">
                          <code className="min-w-0 truncate text-xs text-muted-foreground">
                            {example}
                          </code>
                          <ArrowRight
                            aria-hidden="true"
                            className="size-4 shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
                          />
                        </div>
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="mt-8 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
              {standaloneSkills.map(({ name, href, description }) => (
                <Link
                  key={name}
                  href={href}
                  className="group flex items-center justify-between gap-6 rounded-xl border border-border px-5 py-4 transition-[color,background-color,border-color,transform] duration-150 ease-out hover:border-foreground/20 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.99] motion-reduce:transition-none"
                >
                  <span className="min-w-0">
                    <span className="block font-mono text-sm font-semibold">{name}</span>
                    <span className="mt-1 block text-sm text-pretty text-muted-foreground">
                      {description}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="workflow-heading" className="bg-zinc-950 text-zinc-100">
          <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
            <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-lime-400 uppercase">
                  How It Works
                </p>
                <h2
                  id="workflow-heading"
                  className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-4xl"
                >
                  Install. Trigger. Execute.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-pretty text-zinc-400">
                Skills stay out of the way until your task matches their purpose. Then they give
                your agent the exact operating procedure it needs.
              </p>
            </div>

            <ol className="grid divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
              {steps.map(({ number, title, description, icon: Icon }) => (
                <li key={number} className="py-8 md:px-7 md:py-10 first:md:pl-0 last:md:pr-0">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-zinc-500">{number}</span>
                    <Icon aria-hidden="true" className="size-5 text-lime-400" />
                  </div>
                  <h3 className="mt-10 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-pretty text-zinc-400">
                    {description}
                  </p>
                </li>
              ))}
            </ol>

            <div className="flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-lg font-medium text-pretty">
                Better instructions compound into better work.
              </p>
              <Link
                href={docsRoute}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-lime-400 px-5 text-sm font-semibold text-zinc-950 transition-[background-color,transform] duration-150 ease-out hover:bg-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-[0.98] motion-reduce:transition-none"
              >
                Read the Documentation
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-8 text-sm text-muted-foreground sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="font-semibold text-foreground">brianrabil/skills</p>
            <p className="mt-1">53 practical workflows. MIT licensed.</p>
          </div>
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            <Link className="hover:text-foreground focus-visible:text-foreground" href={docsRoute}>
              Docs
            </Link>
            <Link
              className="hover:text-foreground focus-visible:text-foreground"
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </Link>
            <Link
              className="hover:text-foreground focus-visible:text-foreground"
              href={`https://skills.sh/${gitConfig.user}/${gitConfig.repo}`}
              target="_blank"
              rel="noreferrer"
            >
              skills.sh
            </Link>
            <Link
              className="hover:text-foreground focus-visible:text-foreground"
              href="https://agentskills.io"
              target="_blank"
              rel="noreferrer"
            >
              Agent Skills Spec
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
