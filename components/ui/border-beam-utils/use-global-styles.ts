'use client';

import { useEffect } from 'react';

const injectedStyleIds = new Set<string>();

/** Injects a <style> tag into <head> once per `id`, even across multiple mounted instances. */
export function useGlobalStyles(css: string, id: string) {
  useEffect(() => {
    if (injectedStyleIds.has(id) || document.getElementById(id)) return;

    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
    injectedStyleIds.add(id);
  }, [css, id]);
}
