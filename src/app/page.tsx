"use client";

import { useCallback, useState } from "react";
import { ShaderHero } from "@/components/ShaderHero";
import Image from "next/image";

const downloads = [
  { label: "Windows", href: "https://github.com/GrekF3/SilentWallet/releases/latest" },
  { label: "macOS", href: "https://github.com/GrekF3/SilentWallet/releases/latest" },
  { label: "Android", href: "https://github.com/GrekF3/SilentWallet/releases/latest" },
  { label: "iOS", href: "" },
];

export default function Home() {
  const [isHeroReady, setIsHeroReady] = useState(false);

  const handleHeroReady = useCallback(() => {
    setIsHeroReady(true);
  }, []);

  return (
    <main className="heroPage">
      <ShaderHero onReady={handleHeroReady} />
      <div className="grain" aria-hidden />

      <div className={isHeroReady ? "heroContent heroContentVisible" : "heroContent"}>
        <a
          className="headerLogo"
          href="https://github.com/GrekF3/SilentWallet"
          aria-label="Silent Wallet GitHub"
        >
          <Image src="/logo.png" alt="" aria-hidden width={28} height={28} priority />
          <span>Silent</span>
        </a>

        <section className="minimalHero" aria-labelledby="hero-title">
          <a className="openSource" href="https://github.com/GrekF3/SilentWallet">
            Open-Source
          </a>

          <h1 id="hero-title">Silent Wallet</h1>

          <nav className="downloadNav" aria-label="Download Silent Wallet">
            {downloads.map((item) =>
              item.href ? (
                <a href={item.href} key={item.label}>
                  {item.label}
                </a>
              ) : (
                <span aria-disabled="true" key={item.label}>
                  {item.label}
                </span>
              ),
            )}
          </nav>
        </section>
      </div>
    </main>
  );
}
