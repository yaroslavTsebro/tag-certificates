import { useEffect } from "react";
import useInput from "../../../hook/useInput";
import style from "./Input.module.scss";

export interface Props {
  name: string;
  placeholder: string;
  validationMessages: string[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  validations: Function[];
  commonClasses?: string;
  errorClasses?: string;
  onValidationChange?: (isValid: boolean) => void;
  onValueChange?: (value: string) => void;
}

const Input = ({
  name,
  placeholder,
  validations,
  validationMessages,
  commonClasses,
  errorClasses,
  onValidationChange,
  onValueChange
}: Props) => {
  if (validations.length !== validationMessages.length) {
    throw new Error(
      "validations and validationMessages must have the same length"
    );
  }

  const [
    value,
    valueIsValid,
    isTouched,
    validation,
    valueChangeHandler,
    valueBlurHandler,
    resetValueInput,
  ] = useInput(validations);

  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(valueIsValid);
    }
  }, [valueIsValid, onValidationChange]);

  useEffect(() => {
    if(onValueChange) {
      onValueChange(value);
    }
  }, [value, onValueChange]);


  const hasError = validation.includes(false) && isTouched;
  const classNames =`${style.wrapper} ` + commonClasses + " " + (hasError ? errorClasses : "");


  return (
    <>
      <div className={classNames}>
        <label className={style.label} htmlFor={name}>
          {name}
        </label>
        <input
          type="text"
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={valueChangeHandler}
          onFocus={valueBlurHandler}
          className={style.field}
        />
        {validationMessages.map(
          (message, index) =>
            !validation[index] &&
            isTouched && (
              <p className={style.error}   key={index}>
                {message}
              </p>
            )
        )}
      </div>
    </>
  );
};

export default Input;