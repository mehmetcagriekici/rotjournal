/**
 * Content
 * conditional, list for nav or displaying prev entries
 */

import { useToggleTheme } from "../hooks/useToggleTheme";

function List({ type, children }: { type: string; children: JSX.Element[] }) {
  //darkmode theme
  const { theme } = useToggleTheme();

  if (type === "navList") return <ul className="list list-nav">{children}</ul>;

  if (type === "entriesList")
    return (
      <div
        className={`list list-entries list-entries-${theme ? "dark" : "light"}`}
      >
        {children}
      </div>
    );
}

export default List;
