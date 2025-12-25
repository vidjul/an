"use client";

import { useEffect, useRef, useState } from "react";

import Breadcrumbs from "./Breadcrumbs";

const Header = () => {
  const [showCursor, setShowCursor] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const handleOnEnter = () => {
    setShowCursor(true);
  };

  const handleOnLeave = () => {
    setShowCursor(false);
  };

  useEffect(() => {
    let headerNode: HTMLElement | null = null;
    if (ref.current) {
      headerNode = ref.current;
      headerNode.addEventListener("mouseenter", handleOnEnter);
      headerNode.addEventListener("mouseleave", handleOnLeave);

      return () => {
        if (headerNode) {
          headerNode.removeEventListener("mouseenter", handleOnEnter);
          headerNode.removeEventListener("mouseleave", handleOnLeave);
        }
      };
    }
  }, []);

  return (
    <header
      ref={ref}
      className="font-display sticky top-0 z-10 bg-white px-4 py-8 text-xl shadow-xs md:px-16"
    >
      <span>vidu.sh</span>
      <Breadcrumbs />
      {showCursor && (
        <span className="animate-[blink_1s_step-end_infinite]">_</span>
      )}
    </header>
  );
};

export default Header;
