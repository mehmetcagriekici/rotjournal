import { ChangeEvent, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { HiArrowDown, HiArrowRight, HiExclamation } from "react-icons/hi";
import { usePopper } from "react-popper";
import { useToggleTheme } from "../hooks/useToggleTheme";

interface InputType {
  label: string;
  required: boolean;
  value: string;
  register: UseFormRegister<FieldValues>;
  pattern: RegExp | undefined;
  type: string;
  errors: FieldErrors<FieldValues>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  label,
  required,
  value,
  onChange,
  register,
  pattern,
  type,
  errors,
}: InputType) {
  //popper tools
  const [refElement, setRefElement] = useState<HTMLLabelElement | null>(null);
  const [popElement, setPopElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper<HTMLDivElement | null>(
    refElement,
    popElement
  );

  //darkmode theme
  const { theme } = useToggleTheme();

  if (label === "time" || label === "date" || label === "current") {
    return (
      <div className="input input-auto">
        <label htmlFor={label} className="input input-auto-label">
          {label}
          <span>
            <HiArrowRight />
          </span>
        </label>
        <input
          id={label}
          className="input input-auto-field"
          disabled={true}
          defaultValue={value}
          {...register(label, {
            required,
            value,
            onChange,
          })}
        />
      </div>
    );
  }

  if (label === "entry") {
    return (
      <div className="input input-entry">
        <label
          htmlFor={label}
          className="input input-label input-label-entry"
          ref={setRefElement}
        >
          {label} <HiArrowDown />
        </label>
        <textarea
          className={`input input-entry input-entry-field input-entry-field-${
            theme ? "dark" : "light"
          }`}
          id={label}
          {...register(label, {
            required: {
              value: true,
              message: "This field is required!",
            },
            value,
            onChange,
          })}
        ></textarea>
        {errors[label] && (
          <div
            className="input input-popper input-popper-large"
            ref={setPopElement}
            style={styles.arrow}
            {...attributes.popper}
          >
            <HiExclamation />
            {`${errors[label]?.message}`}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="input">
      <label className="input input-label" htmlFor={label} ref={setRefElement}>
        {label + ":"}
      </label>
      <input
        className={`input input-${label}`}
        type={type}
        id={label}
        {...register(label, {
          required: {
            value: true,
            message: "This field is required!",
          },
          pattern: {
            value: pattern || /.*?/gm,
            message:
              "Pin must be between 4 and 6 characters, must include one capital letter and one number.",
          },
          value,
          onChange,
        })}
      />
      {errors[label] && (
        <div
          className="input input-popper"
          ref={setPopElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <HiExclamation />
          {`${errors[label]?.message}`}
        </div>
      )}
    </div>
  );
}

export default Input;
