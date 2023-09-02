"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Separator = () => <span className="font-normal text-gray-300">/</span>;

const baseUrl = (
  <span key={0}>
    <Separator />
    <Link href="/" className="text-blue-300  hover:underline">
      an
    </Link>
  </span>
);

const Breadcrumbs = () => {
  const pathName = usePathname();

  const pathNestedRoutes = pathName
    // Strip out the first "/"
    .slice(1)
    .split("/");

  const crumbs = [
    baseUrl,
    pathNestedRoutes.map((route, index) => {
      const crumb =
        index === pathNestedRoutes.length - 1 ? (
          <span>{route}</span>
        ) : (
          <Link className="text-blue-300 hover:underline" href={`/${route}`}>
            {route}
          </Link>
        );
      return (
        <span key={index + 1}>
          <Separator />
          {crumb}
        </span>
      );
    }),
  ];

  return <>{crumbs}</>;
};

export default Breadcrumbs;
