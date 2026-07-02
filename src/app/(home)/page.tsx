import { AppWindow, ArrowRight, BookOpen, KeyRound, Code2, MonitorSmartphone, Server } from 'lucide-react';
import { CodeBlock } from 'fumadocs-ui/components/codeblock';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import Link from 'next/link';

const flowSteps = [
  {
    step: '01',
    title: 'Create workspace',
    description: 'Create the workspace and policy first, either through the Admin API or the Sentinel portal.',
    icon: BookOpen,
  },
  {
    step: '02',
    title: 'Backend creates session',
    description: 'Your server creates the Sentinel session when the user starts an activity that needs proctoring.',
    icon: Server,
  },
  {
    step: '03',
    title: 'Backend generates token',
    description: 'Your server generates the session token used to authenticate the SDK.',
    icon: KeyRound,
  },
  {
    step: '04',
    title: 'SDK starts with token',
    description: 'The browser initializes the JS SDK with the token and begins proctoring.',
    icon: MonitorSmartphone,
  },
];

const navCards = [
  {
    title: 'Backend Integration',
    description: 'Create sessions, generate tokens, and control policy from your backend.',
    href: '/docs/backend-integration',
    icon: Server,
  },
  {
    title: 'JS SDK',
    description: 'Install the browser SDK and start Sentinel with session config from your backend.',
    href: '/docs/js-sdk/installation',
    icon: Code2,
  },
  {
    title: 'API Reference',
    description: 'Look up exact request and response shapes once you know the flow.',
    href: '/docs/api-reference',
    icon: BookOpen,
  },
  {
    title: 'Example App',
    description: 'See a working React integration in testpress/sentinel-js-example.',
    href: 'https://github.com/testpress/sentinel-js-example',
    icon: AppWindow,
    external: true,
  },
];

const quickLinks = [
  { title: 'Get started', href: '/docs/getting-started/quickstart' },
  { title: 'API Reference', href: '/docs/api-reference' },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-(--fd-layout-width) flex-1 flex-col gap-12 px-4 py-12 md:px-6 md:py-16">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] lg:items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0667FC]">
                Sentinel Docs
              </p>
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-fd-foreground md:text-5xl">
                AI proctoring, built for your stack.
              </h1>
              <p className="max-w-2xl text-[1.05rem] leading-8 text-fd-muted-foreground">
                Your backend manages sessions and policy through the Admin API, while the Sentinel
                JS SDK runs in-browser to capture anomalies, media and stream events.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={quickLinks[0].href}
                className="inline-flex items-center rounded-full bg-[#0667FC] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0557D6]"
              >
                {quickLinks[0].title}
              </Link>
              <Link
                href={quickLinks[1].href}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-fd-muted-foreground transition-colors hover:text-[#0667FC]"
              >
                {quickLinks[1].title}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-[1.9rem] border border-[#0667FC]/15 bg-[radial-gradient(circle_at_top_left,rgba(6,103,252,0.18),transparent_42%),linear-gradient(135deg,rgba(6,103,252,0.08),rgba(15,23,42,0.02))] p-3 shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:border-[#0667FC]/20 dark:bg-[radial-gradient(circle_at_top_left,rgba(6,103,252,0.22),transparent_38%),linear-gradient(135deg,rgba(15,23,42,0.94),rgba(2,6,23,0.94))] dark:shadow-none">
            <CodeBlock
              title="SDK initialization"
              className="my-0 overflow-hidden rounded-[1.35rem] border-white/10 bg-stone-950 text-stone-50 shadow-none"
              viewportProps={{ className: 'px-4 py-4' }}
            >
              <pre className="text-sm leading-6">
                <code className="block whitespace-pre-wrap break-all">
                  <span className="text-sky-300">const</span>{' '}
                  <span className="text-stone-50">sentinel</span>{' '}
                  <span className="text-stone-400">=</span>{' '}
                  <span className="text-emerald-300">Sentinel.init</span>
                  <span className="text-stone-400">(</span>
                  <span className="text-stone-400">{'{'}</span>
                  {'\n'}
                  {'  '}
                  <span className="text-stone-50">orgCode</span>
                  <span className="text-stone-400">,</span>
                  {'\n'}
                  {'  '}
                  <span className="text-stone-50">sessionId</span>
                  <span className="text-stone-400">,</span>
                  {'\n'}
                  {'  '}
                  <span className="text-stone-50">token</span>
                  {'\n'}
                  <span className="text-stone-400">{'}'}</span>
                  <span className="text-stone-400">)</span>
                  {'\n'}
                  {'\n'}
                  <span className="text-emerald-300">mountSentinelOverlay</span>
                  <span className="text-stone-400">(</span>
                  <span className="text-stone-400">{'{'}</span>
                  {'\n'}
                  {'  '}
                  <span className="text-stone-50">container</span>
                  <span className="text-stone-400">:</span>{' '}
                  <span className="text-stone-50">overlayContainer</span>
                  <span className="text-stone-400">,</span>
                  {'\n'}
                  {'  '}
                  <span className="text-stone-50">sentinel</span>
                  <span className="text-stone-400">,</span>
                  {'\n'}
                  <span className="text-stone-400">{'}'}</span>
                  <span className="text-stone-400">)</span>
                </code>
              </pre>
            </CodeBlock>
          </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold tracking-tight text-fd-foreground">Fastest path</h2>
          <Link
            href="/docs/getting-started/quickstart"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0667FC] transition-colors hover:text-[#0557D6]"
          >
            Open quickstart
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {flowSteps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="rounded-2xl border border-black/20 bg-white/95 p-3.5 text-left shadow-sm dark:border-white/15 dark:bg-white/[0.06] dark:shadow-none"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-[#0667FC] text-white shadow-sm">
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[11px] font-semibold tracking-[0.18em] text-[#0667FC]">
                        {step.step}
                      </p>
                      <span className="h-px w-4 bg-[#0667FC]/30" />
                    </div>
                    <h3 className="mt-1 text-base font-semibold text-fd-foreground">{step.title}</h3>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-fd-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-fd-foreground">Install</h2>
        <Tabs items={['npm', 'CDN']}>
          <Tab>
            <CodeBlock
              className="my-0 overflow-hidden rounded-2xl border-white/10 bg-stone-950 text-stone-50 shadow-[0_18px_45px_rgba(15,23,42,0.12)] dark:border-white/12 dark:shadow-none"
              viewportProps={{ className: 'px-4 py-4' }}
            >
              <pre className="text-sm leading-6">
                <code className="whitespace-pre-wrap break-all">
                  npm install @testpress/sentinel-core @testpress/sentinel-ui
                </code>
              </pre>
            </CodeBlock>
          </Tab>
          <Tab>
            <CodeBlock
              className="my-0 overflow-hidden rounded-2xl border-white/10 bg-stone-950 text-stone-50 shadow-[0_18px_45px_rgba(15,23,42,0.12)] dark:border-white/12 dark:shadow-none"
              viewportProps={{ className: 'px-4 py-4' }}
            >
              <pre className="text-sm leading-6">
                <code className="whitespace-pre-wrap break-all">{`<script type="module">
  import {
    Sentinel,
    mountSentinelOverlay,
  } from "https://static.tpsentinel.com/sdk/v2/core_1.0.2_ui_1.0.0/sentinel-bundle.js";
</script>`}</code>
              </pre>
            </CodeBlock>
          </Tab>
        </Tabs>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-fd-foreground">Go to the right surface</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {navCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                href={card.href}
                target={card.external ? '_blank' : undefined}
                rel={card.external ? 'noreferrer' : undefined}
                className="group rounded-2xl border border-black/15 bg-white/90 p-5 text-left shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-0.5 hover:border-[#0667FC]/40 hover:shadow-[0_18px_38px_rgba(6,103,252,0.12)] dark:border-white/12 dark:bg-white/[0.06] dark:shadow-none"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-[#0667FC] p-2 text-white shadow-sm">
                    <Icon className="size-5" />
                  </div>
                </div>
                <h3 className="mt-4 text-base font-semibold text-fd-foreground">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">{card.description}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-fd-muted-foreground transition-colors group-hover:text-[#0667FC]">
                  Open
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
