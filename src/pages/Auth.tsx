/**
 * UI Elements
 * Auth Form (Login / Signup) (center)
 * Nav (top right)
 * Button (Signup) (external)
 *
 * needs
 * useAuth
 * useToggleTheme
 * Form (login, signup)
 * Input (username password)
 * Nav
 *
 * login form, extended with create account button
 * controls login credentials from local storage (checkLogin from useAuth)
 * if create account, save informations to local storage (issueSignup from useAuth)
 *
 * nav at top right (date / time / darkmode-lightmode switch)
 *
 * default theme : lightmode
 *
 */

import { FieldValues, useForm } from "react-hook-form";
import { BaseSyntheticEvent, useState } from "react";

import { useAuth } from "../hooks/useAuth";

import Form from "../ui/Form";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { PIN_CONTROL } from "../utils/constants";

function Auth() {
  //show-hide signup form
  const [signup, setSignup] = useState(false);

  //local username state
  const [username, setUsername] = useState("");

  //local pin state
  const [pin, setPin] = useState("");

  //auth functionality
  const { checkLogin, issueSignup } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  function toggleSignup() {
    /**
     * display signup sign
     * hide login sign
     * non authenticated
     */

    //clear data
    setUsername("");
    setPin("");

    //reset form
    reset();

    setSignup((signup) => !signup);
  }

  function handleLogin(
    formData: FieldValues,
    event: BaseSyntheticEvent | undefined
  ): void {
    if (event) event.preventDefault();

    //auth form data format
    const { username, pin } = formData;

    //send data for login check (result error string or true)
    const checkLoginResult = checkLogin({ username, pin });
    checkLoginResult;

    //create new form errors
    if (checkLoginResult === "invalid username") {
      setError("username", {
        type: "authentication error",
        message: "No registered username",
      });
    }

    if (checkLoginResult === "invalid pin") {
      setError("pin", {
        type: "authentication error",
        message: "No registered pin",
      });
    }

    if (checkLoginResult === "invalid username and pin") {
      setError("username", {
        type: "authentication error",
        message: "No registered username",
      });
      setError("pin", {
        type: "authentication error",
        message: "No registered pin",
      });
    }

    //clear component data
    setUsername("");
    setPin("");
  }

  function handleSignup(
    formData: FieldValues,
    event: BaseSyntheticEvent | undefined
  ): void {
    if (event) event.preventDefault();

    //auth form data format
    const { username, pin } = formData;

    //send data to signup and save to local storage
    issueSignup({ username, pin });

    //clear component data
    setUsername("");
    setPin("");
  }

  return (
    <div className="auth">
      {signup ? (
        <Button onClick={toggleSignup} type="defaultButton" role="button">
          Login
        </Button>
      ) : (
        <Button onClick={toggleSignup} type="defaultButton" role="button">
          Signup
        </Button>
      )}

      {signup ? (
        <div className="auth-signup">
          <Form type="signup">
            <Input
              label="username"
              required={true}
              value={username}
              register={register}
              onChange={(e) => setUsername(e.target.value)}
              pattern={undefined}
              type="text"
              errors={errors}
            />

            <Input
              label="pin"
              required={true}
              value={pin}
              register={register}
              onChange={(e) => setPin(e.target.value)}
              pattern={PIN_CONTROL}
              type="password"
              errors={errors}
            />

            <Button
              onClick={handleSubmit((data, event) => handleSignup(data, event))}
              type="smallButton"
              role="submit"
            >
              Signup
            </Button>
          </Form>
        </div>
      ) : (
        <div className="auth-login">
          <Form type="login">
            <Input
              label="username"
              required={true}
              value={username}
              register={register}
              onChange={(e) => setUsername(e.target.value)}
              pattern={undefined}
              type="text"
              errors={errors}
            />
            <Input
              label="pin"
              required={true}
              value={pin}
              register={register}
              onChange={(e) => setPin(e.target.value)}
              pattern={PIN_CONTROL}
              type="password"
              errors={errors}
            />
            <Button
              onClick={handleSubmit((data, event) => handleLogin(data, event))}
              type="smallButton"
              role="submit"
            >
              Login
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}

export default Auth;
