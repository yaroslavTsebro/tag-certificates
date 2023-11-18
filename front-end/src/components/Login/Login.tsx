import React, { useState } from "react";
import Input from "../common/Input/Input";

interface LoginProps {
  isLogin: boolean;
}

export const Login: React.FC<LoginProps> = ({ isLogin }) => {
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passValid, setPassValid] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const formIsValid = emailValid && passValid;

  const handleButtonOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleValidationChangeEmail = (isValid: boolean) => {
    setEmailValid(isValid);
  };

  const handleValidationChangePassword = (isValid: boolean) => {
    setPassValid(isValid);
  };

  return (
    <form action="">
      <Input
        name={"Email"}
        placeholder={"Enter your email"}
        onValidationChange={handleValidationChangeEmail}
        validationMessages={[
          "Email must contains @",
          "Email length must be greater than 3",
          "Email length must be less than 50",
        ]}
        onValueChange={setEmail}
        validations={[
          (str: string) => str.includes("@"),
          (str: string) => str.length > 3,
          (str: string) => str.length < 50,
        ]}
      />
      <Input
        name={"Password"}
        placeholder={"Enter your password"}
        onValidationChange={handleValidationChangePassword}
        validationMessages={[
          "Password must contains spec. symbols",
          "Password must contains digits",
          "Password must contain lowercase and capital letters",
          "Password length must be greater than 8",
          "Password length must be less than 20",
        ]}
        onValueChange={setPassword}
        validations={[
          (str: string) => /[!@#$%^&*(),.?":{}|<>]/.test(str), // Checks for special characters
          (str: string) => /\d/.test(str), // Checks for digits
          (str: string) => /[a-z]/.test(str) && /[A-Z]/.test(str), // Checks for lowercase and uppercase letters
          (str: string) => str.length >= 8, // Checks for minimum length
          (str: string) => str.length <= 20, // Checks for maximum length
        ]}
      />
      {formIsValid && (
        <button onClick={handleButtonOnClick}>Some button{email}</button>
      )}
    </form>
  );
};
