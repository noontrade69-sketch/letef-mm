"use client";

import { useEffect, useState } from "react";
import { LINKS } from "@/lib/data";
import { TelegramIcon, MenuIcon, CloseIcon } from "./Icons";

const NAV = [
  ["How it works", "#how-it-works"],
  ["Fees", "#fees"],
  ["Security", "#security"],
  ["Vouches", "#vouches"],
  ["Commands", "#commands"],
  ["FAQ", "#faq"],
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [onHero, setOnHero] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => {
      setSolid(window.scrollY > 24);
      setOnHero(window.scrollY < window.innerHeight * 0.72);
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header className={`header${solid ? " solid" : ""}${onHero && !open ? " on-hero" : ""}`}>
        <div className="wrap">
          <a href="#top" className="brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/letef-mark.svg" alt="Letef Mm logo" width={30} height={30} />
            Letef Mm
          </a>
          <nav className="nav" aria-label="Main">
            {NAV.map(([t, h]) => (
              <a key={h} href={h}>{t}</a>
            ))}
          </nav>
          <div className="head-cta">
            <a className="btn btn-amber" href={LINKS.bot} target="_blank" rel="noopener noreferrer">
              <TelegramIcon /> Open Telegram Bot
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
      </nav>
    </>
  );
}
