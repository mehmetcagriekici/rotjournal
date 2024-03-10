/**
 * Content
 * Conditional display
   (Login: if localStorage does include rot_journal key or if user clicks create new account on LoginAuth page) 
   (Signup: if local storage includes rot_journal key) 
   (Entry Form: 
     Date (automatically filled)
     Time [entery time, submit time] (automatically filled) : when user enters for letter to the text area / when user clicks submit
     Text Area )
 * submit button
 */

import { useToggleTheme } from "../hooks/useToggleTheme";

function Form({ type, children }: { type: string; children: JSX.Element[] }) {
  //for submit modal only
  const { theme } = useToggleTheme();

  if (type === "login")
    return (
      <form className={`form form-login ${theme ? "dark" : "light"}`}>
        {children}
      </form>
    );

  if (type === "signup")
    return (
      <form className={`form form-signup  ${theme ? "dark" : "light"}`}>
        {children}
      </form>
    );

  if (type === "entry")
    return <form className="form form-entry">{children}</form>;
}

export default Form;
