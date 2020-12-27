import React from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function themeChanger() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <button
        type="button"
        className="flex items-center py-2 px-3 text-blue-500 rounded border border-blue-500"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <FontAwesomeIcon icon="adjust" />
      </button>
    </div>
  );
}
