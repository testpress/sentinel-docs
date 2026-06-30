import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName } from './shared';
import Image from "next/image"

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
