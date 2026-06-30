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
    description: 'Start here with the platform overview and setup guidance.',
    url: '/docs/getting-started',
    active: 'nested-url' as const,
  },
  {
    icon: Server,
    text: 'Backend / Webhooks',
    description: 'Backend APIs, webhook handling, and integration patterns.',
    url: '/docs/backend-webhooks',
    active: 'nested-url' as const,
  },
  {
    icon: Code,
    text: 'JS SDK',
    description: 'Client-side integration guides and SDK usage.',
    url: '/docs/js-sdk',
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
    text: 'Online Exam Software',
    url: 'https://testpress.tech/online-exam-software/features/',
    external: true,
    active: 'none' as const,
  },
  {
    text: 'Learning Management System',
    url: 'https://testpress.tech/teach-online/',
    external: true,
    active: 'none' as const,
  },
  {
    text: 'Video Streaming Platform',
    url: 'https://tpstreams.com/',
    external: true,
    active: 'none' as const,
  },
];

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
      type: 'menu',
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
      type: 'menu',
      on: 'nav',
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
