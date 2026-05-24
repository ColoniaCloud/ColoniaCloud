"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  IconBrandWhatsapp,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

const WHATSAPP_URL = "https://wa.me/59800000000";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav
        aria-label="Navegación principal"
        className={`fixed top-0 inset-x-0 z-50 h-[58px] bg-cc-bg border-b border-black/10 transition-shadow duration-200 ease-in-out ${
          scrolled ? "shadow-[0_1px_12px_rgba(0,0,0,0.06)]" : "shadow-none"
        }`}
      >
        <div className="mx-auto h-full max-w-[1280px] px-7 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-7 h-7 bg-cc-accent text-white font-display text-[13px] font-medium leading-none rounded-md">
              CC
            </span>
            <span className="font-display text-[15px] text-cc-text">
              Colonia Cloud
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-7 list-none">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`font-body text-[13px] transition-colors duration-150 ease-in-out hover:text-cc-accent ${
                      active ? "text-cc-accent" : "text-cc-text-body"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-[7px] text-[13px] leading-none font-body text-white bg-cc-accent hover:bg-cc-accent-hover rounded-md transition-colors duration-150 ease-in-out"
            >
              <IconBrandWhatsapp size={15} />
              Escribinos
            </a>

            <button
              type="button"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center w-9 h-9 bg-transparent border-0 text-cc-text p-0 cursor-pointer"
            >
              {open ? <IconX size={22} /> : <IconMenu2 size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-x-0 bottom-0 top-[58px] bg-black/40 z-40"
        />
      )}

      <div
        className={`md:hidden fixed top-[58px] inset-x-0 z-[45] bg-cc-bg p-4 border-b border-black/10 transition-transform duration-250 ease-in-out ${
          open ? "translate-y-0" : "-translate-y-[110%]"
        }`}
      >
        <ul className="flex flex-col gap-1 list-none">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-2 py-3 font-body text-[15px] transition-colors duration-150 ease-in-out hover:text-cc-accent ${
                    active ? "text-cc-accent" : "text-cc-text-body"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
