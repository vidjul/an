"use client";

import { useEffect, useState } from "react";

const Separator = () => <span className="font-normal text-gray-300">/</span>;

const baseUrl = (
  <span key={0}>
    <Separator />
    <a href="/an/" className="text-blue-300 hover:underline">
      an
    </a>
  </span>
);

const Breadcrumbs = () => {
  const [pathName, setPathName] = useState("");

  useEffect(() => {
    setPathName(window.location.pathname);
  }, []);

  const pathNestedRoutes = pathName
    // Strip out the base path and first "/"
    .replace("/an", "")
    .slice(1)
    .split("/")
    .filter(Boolean);

  const crumbs = [
    baseUrl,
    pathNestedRoutes.map((route, index) => {
      const href = `/an/${pathNestedRoutes.slice(0, index + 1).join("/")}`;
      const crumb =
        index === pathNestedRoutes.length - 1 ? (
          <span>{route}</span>
        ) : (
          <a className="text-blue-300 hover:underline" href={href}>
            {route}
          </a>
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
