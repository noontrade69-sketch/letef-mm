"use client";

import { useEffect, useState } from "react";
import { LINKS } from "@/lib/data";
import { TgIcon, MenuIcon } from "./Icons";

const NAV = [
  ["How it works", "#how-it-works"],
  ["Fees", "#fees"],
  ["Security", "#security"],
  ["Vouches", "#vouches"],
  ["Commands", "#commands"],
  ["FAQ", "#faq"],
] as const;

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <header className={`header${solid ? " is-solid" : ""}`}>
        <div className="wrap header-in">
          <a href="#top" className="brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/letef-mark.svg" alt="" width={34} height={34} />
            <span>
              Letef Mm
              <small>Trusted P2P Escrow</small>
            </span>
          </a>
          <nav className="nav" aria-label="Main">
            {NAV.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
          <a className="btn btn-y" href={LINKS.bot} target="_blank" rel="noopener noreferrer">
            <TgIcon /> Open Telegram Bot
          </a>
          <button className="menu-btn" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            <MenuIcon width={22} height={22} />
          </button>
        </div>
      </header>
      <nav className={`mnav${open ? " open" : ""}`} aria-label="Mobile">
        {NAV.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a className="btn btn-y" href={LINKS.bot} target="_blank" rel="noopener noreferrer">
          <TgIcon /> Open Telegram Bot
        </a>
      </nav>
    </>
  );
}
