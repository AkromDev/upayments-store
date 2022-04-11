import Link from 'next/link';
import React from 'react';

export interface MainLayoutProps {
  children: React.ReactNode;
  contentClassname?: string;
}

export default function MainLayout({
  children,
  contentClassname,
}: MainLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-1 flex-col items-center py-10 px-5">
      <div className="mb-10 flex w-full max-w-4xl items-center justify-between rounded-md bg-white px-5 py-2 font-semibold italic shadow-sm">
        <Link href="/">
          <a>UPayments Store</a>
        </Link>
        <Link href="/product/create">
          <a>Create</a>
        </Link>
      </div>
      <div className={`w-full max-w-4xl ${contentClassname}`}>{children}</div>
    </div>
  );
}
