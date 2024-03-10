//User Information
/**
 * Content
 * profile photo
 * user name
 * total count of entries (yearly)
 * percentage (total count / total days)
 */

import { HiUserCircle } from "react-icons/hi";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToggleTheme } from "../hooks/useToggleTheme";
import { LOCAL_STORAGE_USERNAME_KEY } from "../utils/constants";

import List from "./List";
import ListElement from "./ListElement";
import Button from "./Button";
import { useState } from "react";
import Modal from "./Modal";

function Profile({ entries }: { entries: string[] }) {
  //submit form display
  const [openSubmitForm, setOpenSubmitForm] = useState(false);
  //darkmode theme
  const { theme } = useToggleTheme();

  //profile information
  const { readFromLocalStorage } = useLocalStorage();

  //username
  const username = readFromLocalStorage({ key: LOCAL_STORAGE_USERNAME_KEY });

  const entriesCount = String(entries.length);

  function onUserButtonClick() {
    setOpenSubmitForm((open) => !open);
  }

  return (
    <nav className={`nav nav-bot nav-bot-${theme ? "dark" : "light"}`}>
      {openSubmitForm && (
        <Modal onMistake={() => {}} mistakeCount={100} type="submit" />
      )}
      <List type="navList">
        <Button onClick={onUserButtonClick} type="iconButton" role="button">
          <HiUserCircle />
        </Button>
        <ListElement onClick={() => {}} type="navListElement">
          {"welcome " + username}
        </ListElement>
        <ListElement onClick={() => {}} type="navListElement">
          {entriesCount + `${Number(entriesCount) > 1 ? " entries" : " entry"}`}
        </ListElement>
      </List>
    </nav>
  );
}

export default Profile;
