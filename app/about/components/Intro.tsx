"use client";

import { useMyAge } from "hooks/useMyAge";

export const Intro = () => {
  const myAge = useMyAge();

  return (
    <p>
      Hello, I am Vidushan! 👋
      <br />
      <br />I am a {myAge} years old Software Engineer based in Paris. When
      I&apos;m not coding, I will usually spend my time playing video games,
      watching anime, or sharing moments with my cousins and family.
    </p>
  );
};
