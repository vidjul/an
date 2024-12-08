import { getMyAge } from "utils/getMyAge";

export const Intro = () => {
  const myAge = getMyAge();

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
