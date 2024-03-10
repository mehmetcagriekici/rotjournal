/**
 * Content
 * Submit button : submit auth, submit entry
 * Logout button
 * Switch dark mode light mode button
 * Close Modal Button
 */

import { MouseEventHandler } from "react";
import { useToggleTheme } from "../hooks/useToggleTheme";

function Button({
  type,
  children,
  onClick,
  role,
}: {
  type: string;
  children: React.ReactNode;
  onClick: MouseEventHandler;
  role: "submit" | "reset" | "button" | undefined;
}) {
  //dark theme
  const { theme } = useToggleTheme();

  if (type === "iconButton")
    return (
      <button onClick={onClick} className="button button-icon" type={role}>
        {children}
      </button>
    );
  if (type === "toggleButton")
    return (
      <button onClick={onClick} className="button button-toggle" type={role}>
        {children}
      </button>
    );
  if (type === "defaultButton")
    return (
      <button
        onClick={onClick}
        className={`button button-default button-default-${
          theme ? "dark" : "light"
        }`}
        type={role}
      >
        {children}
      </button>
    );
  if (type === "smallButton")
    return (
      <button onClick={onClick} className="button button-small" type={role}>
        {children}
      </button>
    );
}

export default Button;
