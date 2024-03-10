/**
 * Content
 * Date and Time (now)
 * Switch Dark mode Light mode
 * if logged in logout button
 */

import Button from "./Button";
import List from "./List";
import ListElement from "./ListElement";

import {
  HiMiniArrowLeftOnRectangle,
  HiMoon,
  HiOutlineSun,
} from "react-icons/hi2";

import { useDate } from "../hooks/useDate";

import { useToggleTheme } from "../hooks/useToggleTheme";
import { useAuth } from "../hooks/useAuth";

function Nav() {
  //global ui states
  const { auth, logout } = useAuth();

  const { theme, onToggleTheme, toggleThemeControl } = useToggleTheme();

  const { formattedDate, formattedTime } = useDate();

  function leaveApp() {
    logout();
  }

  return (
    <nav className={`nav nav-top nav-top-${theme ? "dark" : "light"}`}>
      <List type="navList">
        <ListElement
          onClick={() => {}}
          type="navListElement"
        >{`${formattedDate}`}</ListElement>
        <ListElement
          onClick={() => {}}
          type="navListElement"
        >{`${formattedTime}`}</ListElement>
      </List>
      <Button
        type="toggleButton"
        role="button"
        onClick={() => {
          toggleThemeControl();
          onToggleTheme("layout");
          onToggleTheme("nav-top");
          onToggleTheme("nav-bot");
          onToggleTheme("input-entry-field");
          onToggleTheme("button-default");
          onToggleTheme("list-entries");
          onToggleTheme("list-element-entry");
          onToggleTheme("modal-readonly");
          onToggleTheme("modal-pin");
          onToggleTheme("modal-submit");
        }}
      >
        {theme ? <HiMoon /> : <HiOutlineSun />}
      </Button>
      {auth && (
        <Button type="iconButton" role="button" onClick={leaveApp}>
          <HiMiniArrowLeftOnRectangle />
        </Button>
      )}
    </nav>
  );
}

export default Nav;
