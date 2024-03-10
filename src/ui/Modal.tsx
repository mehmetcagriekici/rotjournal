/**
 * content
 * read only decrypted entry for auth only
 * pin
 */

import { BaseSyntheticEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";

import Button from "./Button";
import Form from "./Form";
import Input from "./Input";

import { useToggleModals } from "../hooks/useToggleModals";
import { useRot13 } from "../hooks/useRot13";
import { useToggleTheme } from "../hooks/useToggleTheme";
import { ENTRY_STR_CONTROL, PIN_CONTROL } from "../utils/constants";
import { useAuth } from "../hooks/useAuth";

interface ModalInputsType {
  type: string;
  onMistake: (count: number) => void;
  mistakeCount: number;
}

function Modal({ type, onMistake, mistakeCount }: ModalInputsType) {
  //will be used to store decrypted data
  let decryptedData = "";

  //edit profile form display state
  const [showEdit, setShowEdit] = useState(false);
  //edit profile control state (validation to edit)
  const [validEdit, setValidEdit] = useState(false);
  //edit profile username and pin values
  const [editUsername, setEditUsername] = useState("");
  const [editPin, setEditPin] = useState("");

  //darkmode theme
  const { theme } = useToggleTheme();
  //form
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //to update username and pin
  const { checkPin, checkPinAndUsername, issueSignup } = useAuth();

  //modal states
  const { hidePinModal, hideReadonlyModal, showReadonlyModal, modalData } =
    useToggleModals();

  //decryption and restructuring the data
  const { decryption } = useRot13();

  //submit modal will not need the data. Also modal data will not exist!
  if (type !== "submit") decryptedData = decryption({ data: modalData });

  const [entry, date, time] = decryptedData.split(ENTRY_STR_CONTROL);

  //onsubmit
  function onSubmit(
    formData: FieldValues,
    event: BaseSyntheticEvent | undefined
  ) {
    //prevent reload
    if (event) event.preventDefault();

    //check pin
    const { pin } = formData;

    if (checkPin({ pin })) {
      //everything is ok, you can read the selected entry
      hidePinModal();
      showReadonlyModal();
      onMistake(3);
    } else {
      onMistake(mistakeCount - 1);
    }

    //reset field
    reset();
  }

  //close readonly modal
  function onCloseReadonly() {
    hideReadonlyModal();
  }

  //edit form display
  function onOpenEdit() {
    //open edit form
    setShowEdit(true);
  }

  //edit validation
  function onEditValidation(
    formData: FieldValues,
    event: BaseSyntheticEvent | undefined
  ) {
    event?.preventDefault();

    //control inputs with userdate
    if (
      checkPinAndUsername({ username: formData.username, pin: formData.pin })
    ) {
      //hide validation
      setShowEdit(false);

      //open edit
      setValidEdit(true);

      //reset form
      reset();

      //reset pin
      setEditPin("");
    }
  }

  //edit submit
  function onEditProfile(
    formData: FieldValues,
    event: BaseSyntheticEvent | undefined
  ) {
    event?.preventDefault();

    //check if valid pin and pin are the same
    //update username and pin
    if (formData["pin-valid"] === formData.pin)
      issueSignup({ username: formData.username, pin: formData.pin });
    else throw new Error("pin and pin valid do not match!");

    //reset form
    reset();

    //close edit
    setValidEdit(false);
  }

  if (type === "pin")
    return (
      <div className={`modal modal-pin modal-pin-${theme ? "dark" : "light"}`}>
        <Button type="iconButton" role="button" onClick={hidePinModal}>
          <HiArrowLeftOnRectangle />
        </Button>
        {mistakeCount < 3 && (
          <span>
            <strong>{mistakeCount}</strong> tries, until logout!
          </span>
        )}
        <Form type="login">
          <Input
            label="pin"
            type="password"
            required={true}
            pattern={undefined}
            register={register}
            errors={errors}
            value=""
            onChange={() => {}}
          />
          <Button
            type="smallButton"
            role="submit"
            onClick={handleSubmit(onSubmit)}
          >
            submit
          </Button>
        </Form>
      </div>
    );

  if (type === "readonly")
    return (
      <div
        className={`modal modal-readonly modal-readonly-${
          theme ? "dark" : "light"
        }`}
      >
        <div className="modal modal-readonly-date">
          <span>{date}</span>
        </div>
        <div className="modal modal-readonly-time">
          <span>{time}</span>
        </div>
        <div className="modal modal-readonly-entry">
          <p>{entry}</p>
        </div>
        <Button type="iconButton" role="button" onClick={onCloseReadonly}>
          <HiArrowLeftOnRectangle />
        </Button>
      </div>
    );

  if (type === "submit") {
    /**
     * open when user clicks profile open button
     * visual is like a small popup
     * purpose :
     * and ability to change username and pin
     *
     * edit profile button
     */
    return (
      <div
        className={`modal modal-submit modal-submit-${
          theme ? "dark" : "light"
        }`}
      >
        {showEdit && (
          <div className="modal modal-submit modal-submit-control">
            <Form type="login">
              <Input
                label="username"
                required={true}
                register={register}
                pattern={undefined}
                type="text"
                errors={errors}
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
              />
              <Input
                label="pin"
                required={true}
                register={register}
                pattern={PIN_CONTROL}
                type="password"
                errors={errors}
                value={editPin}
                onChange={(e) => setEditPin(e.target.value)}
              />
              <Button
                type="smallButton"
                role="submit"
                onClick={handleSubmit(onEditValidation)}
              >
                validate
              </Button>
            </Form>
          </div>
        )}
        {validEdit && (
          <div className="modal modal-submit modal-submit-edit">
            <Form type="signup">
              <Input
                label="username"
                required={true}
                register={register}
                pattern={undefined}
                type="text"
                errors={errors}
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
              />
              <Input
                label="pin"
                required={true}
                register={register}
                pattern={PIN_CONTROL}
                type="password"
                errors={errors}
                value={editPin}
                onChange={(e) => setEditPin(e.target.value)}
              />
              <Input
                label="pin-valid"
                required={true}
                register={register}
                pattern={PIN_CONTROL}
                type="password"
                errors={errors}
                value={editPin}
                onChange={(e) => setEditPin(e.target.value)}
              />
              <Button
                type="smallButton"
                role="submit"
                onClick={handleSubmit(onEditProfile)}
              >
                update user
              </Button>
            </Form>
          </div>
        )}
        {showEdit || validEdit || (
          <Button type="smallButton" role="button" onClick={onOpenEdit}>
            edit profile
          </Button>
        )}
      </div>
    );
  }
}

export default Modal;
