import { useDispatch, useSelector } from "react-redux";
import { getTheme, toggleTheme } from "../features/darklightSlice";

function useToggleTheme() {
  //will be used by one button only
  //will effect the classnames of the components

  const dispatch = useDispatch();
  const theme = useSelector(getTheme);

  function onDark({ className }: { className: string }) {
    const nodeList = document.querySelectorAll(`.${className}`);

    if (nodeList.length === 1) {
      nodeList[0].classList.remove(`${className}-light`);
      nodeList[0].classList.add(`${className}-dark`);
    } else {
      nodeList.forEach((element) => {
        element.classList.remove(`${className}-light`);
        element.classList.add(`${className}-dark`);
      });
    }
  }

  function onLight({ className }: { className: string }) {
    const nodeList = document.querySelectorAll(`.${className}`);

    if (nodeList.length === 1) {
      nodeList[0].classList.remove(`${className}-dark`);
      nodeList[0].classList.add(`${className}-light`);
    } else {
      nodeList.forEach((element) => {
        element.classList.remove(`${className}-dark`);
        element.classList.add(`${className}-light`);
      });
    }
  }

  //control darkmode (true/false)
  function toggleThemeControl() {
    dispatch(toggleTheme());
  }

  //manipulate colors and background colors based on theme
  function onToggleTheme(className: string) {
    if (theme) onLight({ className });
    else onDark({ className });
  }

  return { theme, onToggleTheme, toggleThemeControl };
}

export { useToggleTheme };
