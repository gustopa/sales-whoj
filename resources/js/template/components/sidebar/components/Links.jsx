/* eslint-disable */
import React from "react";
import { Link } from "@inertiajs/react";
import DashIcon from "$/components/icons/DashIcon";
// chakra imports

export function SidebarLinks(props) {
  // Chakra color mode

  const { routes } = props;


  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (
        route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/rtl"
      ) {
        return (
          <Link key={index} href={route.layout + "/" + route.path}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
                key={index}
              >
                <span
                  className={``}
                >
                  {route.icon ? route.icon : <DashIcon />}{" "}
                </span>
                <p
                  className={`leading-1 ml-4 flex`}
                >
                  {route.name}
                </p>
              </li>
              { null}
            </div>
          </Link>
        );
      }
    });
  };
  // BRAND
  return createLinks(routes);
}

export default SidebarLinks;
