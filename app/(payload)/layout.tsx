import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts';
import config from '@payload-config';
import { importMap } from './admin/importMap';
import '@payloadcms/next/css';

export const metadata: Metadata = {
  metadataBase: new URL('https://colonia.cloud'),
};

async function serverFunction({ args, name }: { args: Record<string, unknown>; name: string }) {
  'use server';
  return handleServerFunctions({ config, importMap, args, name });
}

export default function PayloadLayout({ children }: { children: ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}