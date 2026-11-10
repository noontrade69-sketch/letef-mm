"use client";

import { useEffect, useState } from "react";
import { LINKS } from "@/lib/data";
import { TelegramIcon, MenuIcon, CloseIcon } from "./Icons";

const NAV = [
  ["How it works", "#how-it-works"],
  ["Fees", "#fees"],
  ["Vaults", "#vaults"],
  ["Commands", "#commands"],
  ["FAQ", "#faq"],
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 8);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header className={`header${solid ? " solid" : ""}`}>
        <div className="wrap">
          <a href="#top" className="brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/letef-mark.svg" alt="Letef Mm logo" width={26} height={26} />
            Letef Mm
          </a>
          <nav className="nav" aria-label="Main">
            {NAV.map(([t, h]) => (
              <a key={h} href={h}>{t}</a>
            ))}
          </nav>
          <div className="head-cta">
            <a className="comm" href={LINKS.group} target="_blank" rel="noopener noreferrer">Community</a>
            <a className="btn btn-y" href={LINKS.bot} target="_blank" rel="noopener noreferrer">
              <TelegramIcon /> Open Bot
            </a>
            <button
              className="menu-btn"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>
      <nav className={`mnav${open ? " open" : ""}`} aria-label="Mobile">
        {NAV.map(([t, h]) => (
          <a key={h} href={h} onClick={() => setOpen(false)}>{t}</a>
        ))}
        <a href={LINKS.group} target="_blank" rel="noopener noreferrer">Community — {LINKS.groupHandle}</a>
      </nav>
    </>
  );
}
