import React, { useContext, useState } from "react";
import Input from "../common/Input/Input";
import style from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import UserService from "../../http/service/UserService";
import { CLEINT_URL } from "../../http";
import { observer } from "mobx-react-lite";

const Login: React.FC<{ isLoginProp: boolean }> = observer(
  ({ isLoginProp }) => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState<boolean>(isLoginProp);
    const [email, setEmail] = useState<string>("");
    const [emailValid, setEmailValid] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [passValid, setPassValid] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [usernameValid, setUsernameValid] = useState<boolean>(false);

    const formIsValid = emailValid && passValid && usernameValid;

    const handleButtonOnClick = async (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
      try {
        let response;
        if (isLogin) {
          response = await UserService.login(email, password);
        } else {
          response = await UserService.register({ email, username, password });
        }
        console.log(response);
        store.setUser(response.data);
        store.setAuth(true);
        navigate("../");
      } catch (e) {
        console.log(e);
      }
    };

    const handleValidationChangeEmail = (isValid: boolean) => {
      setEmailValid(isValid);
    };

    const handleValidationChangePassword = (isValid: boolean) => {
      setPassValid(isValid);
    };

    const handleValidationChangeUsername = (isValid: boolean) => {
      setUsernameValid(isValid);
    };

    return (
      <div className={style.wrapper}>
        <form className={style.body} action="">
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
          {!isLogin && (
            <Input
              name={"Username"}
              placeholder={"Enter your username"}
              onValidationChange={handleValidationChangeUsername}
              validationMessages={[
                "Username length must be greater than 8",
                "Username length must be less than 30",
              ]}
              onValueChange={setUsername}
              validations={[
                (str: string) => str.length >= 8, // Checks for minimum length
                (str: string) => str.length <= 30, // Checks for maximum length
              ]}
            />
          )}
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
          <button
            className={style.button}
            onClick={handleButtonOnClick}
          >
            {isLogin ? "Login" : "Register"}
          </button>
          {isLogin ? (
            <div>
              Dont have an account?{" "}
              <Link to="../register" onClick={() => setIsLogin(false)}>
                Register
              </Link>
            </div>
          ) : (
            <div>
              Already have an account?{" "}
              <Link to="../login" onClick={() => setIsLogin(true)}>
                Login
              </Link>
            </div>
          )}
        </form>
      </div>
    );
  }
);

export default Login;
