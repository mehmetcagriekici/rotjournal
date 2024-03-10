import Form from "../ui/Form";
import List from "../ui/List";
import Profile from "../ui/Profile";
import ListElement from "../ui/ListElement";
import Button from "../ui/Button";
import Input from "../ui/Input";

import { useDate } from "../hooks/useDate";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  DEFAULT_LIST_MESSAGE,
  ENTRY_STR_CONTROL,
  LOCAL_STORAGE_ENTRY_KEY,
  LOCAL_STORAGE_NEW_ENTRY,
  LOCAL_STROAGE_KEY_CONTROL,
} from "../utils/constants";

import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { HiOutlineClock } from "react-icons/hi";
import { useRot13 } from "../hooks/useRot13";
import Modal from "../ui/Modal";
import { useToggleModals } from "../hooks/useToggleModals";
import { useAuth } from "../hooks/useAuth";
import { useToggleHideByHeight } from "../hooks/useToggleHideByHeight";
import { TiArrowRepeat } from "react-icons/ti";

/**
 * UI Elements
 * Form (enter diary) (left)
 * inputs: date (auto), time (auto), textarea
 * List (show previous entries) (right)
 * Profile (user information) bottom left
 */

function Home() {
  //form entry
  const [text, setText] = useState("");

  //encrypted
  const [encryptedEntries, setEncryptedEntries] = useState([""]);

  //pin mistake count
  const [pinMistake, setPinMistake] = useState(3);

  //state to toggle hidden elements (form or list). only used after height breakpoint.
  //defult display is form when state is true
  const [displayListOrForm, setDisplayListOrForm] = useState(false);
  //button will diplay if only window height is broke (check sass/abstracts/variables)
  const showHideButton = useRef(false);

  //modal states
  const {
    openPinModal,
    openReadonlyModal,
    showPinModal,
    hidePinModal,
    setModalData,
  } = useToggleModals();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();

  const { constDate, constTime, formattedTime } = useDate();

  const { updateLocalStorage, readPureFromLocalStorage } = useLocalStorage();

  const { encryption } = useRot13();

  const { logout } = useAuth();

  const { checkIfHeightBroke, addClassHide, removeClassHide } =
    useToggleHideByHeight();

  //check for height, if it will display or note
  useEffect(() => {
    if (checkIfHeightBroke()) showHideButton.current = true;
    else showHideButton.current = false;
  }, [checkIfHeightBroke]);

  //reset form if is submit is successful
  useEffect(() => {
    reset();
    setText("");
  }, [isSubmitSuccessful, reset]);

  //get data from the local storage, which will be used for the list
  //initial data (only on first render)
  useEffect(() => {
    const initialEntryData = readPureFromLocalStorage({
      key: LOCAL_STORAGE_ENTRY_KEY,
    });

    if (initialEntryData === LOCAL_STROAGE_KEY_CONTROL) {
      setEncryptedEntries([DEFAULT_LIST_MESSAGE]);
    } else {
      setEncryptedEntries(
        initialEntryData.split(LOCAL_STORAGE_NEW_ENTRY).filter((el) => el)
      );
    }
  }, []);

  //if mistake count reaches zero cancel authentication
  useEffect(() => {
    if (pinMistake === 0) {
      logout();
    }
  }, [pinMistake, logout]);

  //add hide class to list, if display list or form false (default)
  useEffect(() => {
    if (!displayListOrForm) addClassHide({ className: "list" });
  }, [displayListOrForm, addClassHide]);

  function onEntry(data: FieldValues, event: BaseSyntheticEvent | undefined) {
    if (event) event.preventDefault();

    //data form : {date:string; time:string; entry:string;}
    const { date, time, entry } = data;

    /**
     * save encrypted entry (date/start time/end time/entry) to local storage
     * reset input fields
     * reset time on button click
     */

    //save date, time and entry as the value, seperate them with new lines. New lines ignore encryption, directly converted to binary in 8 bits.
    const entryData =
      entry + ENTRY_STR_CONTROL + date + ENTRY_STR_CONTROL + time;

    updateLocalStorage({
      key: LOCAL_STORAGE_ENTRY_KEY,
      value: entryData,
    });

    //encrypt entryData, update encryptedEntries
    const encryptedData = encryption({ data: entryData });

    setEncryptedEntries((entries) => {
      const [first, ...rest] = entries;
      if (first === DEFAULT_LIST_MESSAGE) return [...rest, encryptedData];
      return [...entries, encryptedData];
    });
  }

  //function to  control modals
  function onListElementClick({ index }: { index: number }) {
    /**
     * opens ask pin modal
     * user has 3 rights to enter the correct pin
     * 30 seconds countdown
     * if fails end session (make user unauthorized)
     */

    //send selected entry to modal
    setModalData(encryptedEntries[index]);

    //toggle pin modal
    if (openPinModal) hidePinModal();
    else showPinModal();
  }

  //if height  breaks, on button click, control which element will be hidden, which one will be displayed
  function onHeightBroke() {
    if (displayListOrForm) {
      addClassHide({ className: "list" });
      removeClassHide({ className: "form" });
      setDisplayListOrForm(false);
    } else {
      addClassHide({ className: "form" });
      removeClassHide({ className: "list" });
      setDisplayListOrForm(true);
    }
  }

  return (
    <div className="home">
      {showHideButton.current && (
        <Button type="iconButton" role="button" onClick={onHeightBroke}>
          <TiArrowRepeat />
        </Button>
      )}
      {openReadonlyModal || (
        <Form type="entry">
          <div className="form form-entry form-entry-time">
            <Input
              register={register}
              label="time"
              required={true}
              value={constTime}
              onChange={() => {}}
              pattern={undefined}
              type="text"
              errors={errors}
            />

            <Input
              register={register}
              label="date"
              required={true}
              value={constDate}
              onChange={() => {}}
              pattern={undefined}
              type="text"
              errors={errors}
            />

            <Button
              type="iconButton"
              role="button"
              onClick={() => reset({ time: formattedTime })}
            >
              <HiOutlineClock />
            </Button>
          </div>

          <Input
            register={register}
            label="entry"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required={true}
            pattern={undefined}
            type="text"
            errors={errors}
          />

          <Button
            onClick={handleSubmit((data, event) => onEntry(data, event))}
            type="defaultButton"
            role="submit"
          >
            Submit Entry
          </Button>
        </Form>
      )}

      {openPinModal && (
        <Modal
          mistakeCount={pinMistake}
          onMistake={(count: number) => setPinMistake(count)}
          type="pin"
        />
      )}

      {openReadonlyModal ? (
        <Modal
          mistakeCount={pinMistake}
          onMistake={() => setPinMistake((mistake) => mistake - 1)}
          type="readonly"
        />
      ) : (
        <List type="entriesList">
          {encryptedEntries.map((entry: string, index) => {
            if (entry === DEFAULT_LIST_MESSAGE)
              return <span key={index}>{entry}</span>;
            return (
              <ListElement
                onClick={() => onListElementClick({ index })}
                key={index}
                type="entryListElement"
              >
                {entry}
              </ListElement>
            );
          })}
        </List>
      )}
      <Profile entries={encryptedEntries} />
    </div>
  );
}

export default Home;
