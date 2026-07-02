import type {
  BaseLayoutProps,
  LinkItemType,
  MainItemType,
} from 'fumadocs-ui/layouts/shared';
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from 'fumadocs-ui/layouts/home/navbar';
import {
  ArrowRight,
  BookOpen,
  Code,
  Server,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { appName } from './shared';

const documentationItems = [
  {
    icon: BookOpen,
    text: 'Getting Started',
    description: 'Concepts and quickstart',
    url: '/docs/getting-started',
    active: 'nested-url' as const,
  },
  {
    icon: Server,
    text: 'Backend Integration',
    description: 'Create and manage sessions',
    url: '/docs/backend-integration',
    active: 'nested-url' as const,
  },
  {
    icon: Code,
    text: 'JS SDK',
    description: 'Browser SDK integration',
    url: '/docs/js-sdk/installation',
    active: 'nested-url' as const,
  },
  {
    icon: BookOpen,
    text: 'API Reference',
    description: 'Full endpoint reference',
    url: '/docs/api-reference',
    active: 'nested-url' as const,
  },
] satisfies Array<{
  icon: LucideIcon;
  text: string;
  description: string;
  url: string;
  active: 'nested-url';
}>;

const documentationMenuItems: MainItemType[] = documentationItems.map((item) => ({
  text: item.text,
  description: item.description,
  url: item.url,
  active: item.active,
  icon: <item.icon className="size-4" />,
}));

const productsItems = [
  {
    text: 'Online Exam Software and LMS',
    description: 'Run online exams, manage courses, and deliver training from a single platform.',
    url: 'https://testpress.tech/',
    productName: 'Testpress',
    external: true,
    active: 'none' as const,
  },
  {
    text: 'Video and Live Streaming',
    description: 'All-in-One Platform for Secure Video Hosting and Live Streaming for your organization',
    url: 'https://tpstreams.com/',
    productName: 'TPStreams',
    external: true,
    active: 'none' as const,
  },
];

function productsMenu() {
  return (
    <NavbarMenu>
      <NavbarMenuTrigger>Products</NavbarMenuTrigger>
      <NavbarMenuContent className="lg:grid-cols-2">
        {productsItems.map((item) => (
          <NavbarMenuLink key={item.url} href={item.url} external={item.external}>
            <div className="pb-2">
              <div className="mb-4 inline-flex rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-sm font-semibold tracking-tight text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100">
                {item.productName}
              </div>
              <div className="space-y-1">
                <p className="text-base font-medium">{item.text}</p>
                <p className="text-sm text-fd-muted-foreground">{item.description}</p>
              </div>
            </div>
          </NavbarMenuLink>
        ))}
      </NavbarMenuContent>
    </NavbarMenu>
  );
}

function loginButton() {
  return (
    <Link
      href="https://app.tpsentinel.com/signup/"
      className="inline-flex h-9 items-center rounded-lg border border-transparent bg-[#0667FC] px-3.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0557D6] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0667FC]/30"
    >
      Login
      <ArrowRight className="ms-1.5 size-4 -me-0.5" />
    </Link>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div title={appName} className="flex items-center gap-2.5 text-stone-800 dark:text-stone-100">
          <Image
            src="/favicon-32x32.png"
            alt="TPSentinel Logo"
            width={24}
            height={24}
            className="rounded-md"
          />
          <span className="font-medium">{appName}</span>
        </div>
      ),
    },
  };
}

export function homeLinks(): LinkItemType[] {
  return [
    {
      type: 'custom',
      on: 'nav',
      children: (
        <NavbarMenu>
          <NavbarMenuTrigger>Documentation</NavbarMenuTrigger>
          <NavbarMenuContent>
            {documentationItems.map((item) => (
              <NavbarMenuLink key={item.url} href={item.url}>
                <item.icon className="mb-2 rounded-md bg-[#0667FC] p-1 text-white" />
                <p className="font-medium">{item.text}</p>
                <p className="text-sm text-fd-muted-foreground">{item.description}</p>
              </NavbarMenuLink>
            ))}
          </NavbarMenuContent>
        </NavbarMenu>
      ),
    },
    {
      type: 'menu',
      on: 'menu',
      text: 'Documentation',
      url: '/docs/getting-started',
      active: 'nested-url',
      items: documentationMenuItems,
    },
    {
      type: 'custom',
      on: 'nav',
      children: productsMenu(),
    },
    {
      type: 'menu',
      on: 'menu',
      text: 'Products',
      items: productsItems,
    },
    {
      type: 'custom',
      secondary: true,
      children: loginButton(),
    },
  ];
}

export function docsLinks(): LinkItemType[] {
  return [
    {
      type: 'menu',
      on: 'nav',
      text: 'Documentation',
      url: '/docs/getting-started',
      active: 'nested-url',
      items: documentationMenuItems,
    },
    {
      type: 'custom',
      on: 'nav',
      children: productsMenu(),
    },
    {
      type: 'menu',
      on: 'menu',
      text: 'Products',
      items: productsItems,
    },
    {
      type: 'custom',
      on: 'nav',
      secondary: true,
      children: loginButton(),
    },
  ];
}
