import { useEffect, useRef } from "react";

interface ClassName {
  className: string;
}

function useToggleHideByHeight() {
  const HEIGHT_BREAK_POINT = 608; //in pixels, $breakHeight in sass variables
  const height = useRef(window.innerHeight);

  useEffect(() => {
    height.current = window.innerHeight;
  }, [window.innerHeight]);

  function checkIfHeightBroke() {
    if (height.current <= HEIGHT_BREAK_POINT) return true;
    return false;
  }

  function addClassHide({ className }: ClassName) {
    const element = document.querySelector(`.${className}`);

    element?.classList.add(`${className}-hide`);
  }

  function removeClassHide({ className }: ClassName) {
    const element = document.querySelector(`.${className}`);

    element?.classList.remove(`${className}-hide`);
  }

  return { addClassHide, removeClassHide, checkIfHeightBroke };
}

export { useToggleHideByHeight };
