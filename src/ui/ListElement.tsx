/**
 * Content
 * Submit date and submit time (nav)
 * Feature : onClick ask pin if true open modal if false error (totat error countdown, when reaches zero auto logout)
 * bacground encrypted entry, overflow hidden
 */

import { MouseEventHandler } from "react";

import { useToggleTheme } from "../hooks/useToggleTheme";

function ListElement({
  type,
  children,
  onClick,
}: {
  type: string;
  children: string;
  onClick: MouseEventHandler;
}) {
  //dark mode theme
  const { theme } = useToggleTheme();

  if (type === "navListElement")
    return <li className="list-element list-element-nav">{children}</li>;

  if (type === "entryListElement")
    return (
      <div
        className={`list-element list-element-entry list-element-entry-${
          theme ? "dark" : "light"
        }`}
        onClick={onClick}
      >
        {children}
      </div>
    );
}

export default ListElement;
