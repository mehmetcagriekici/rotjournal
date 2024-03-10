/**
 * Nav : Top right / always
 * Home : Center / after auth
 * Auth : Center / before auth
 */

import { useToggleTheme } from "../hooks/useToggleTheme";

//default light mode
function AppLayout({ children }: { children: React.ReactNode }) {
  //darkmode theme
  const { theme } = useToggleTheme();

  return (
    <div className={`layout layout-${theme ? "dark" : "light"}`}>
      {children}
    </div>
  );
}

export default AppLayout;
