import React, { useState } from "react";

import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./Auth.css";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      emailAddress: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    console.log(formState.isValid);
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          nickname: undefined,
        },
        formState.inputs.emailAddress.isValid &&
          formState.inputs.password.isValid
      );
    } else {
      setFormData(
        { ...formState.inputs, nickname: { value: "", isValid: false } },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitFormHandler = (e) => {
    e.preventDefault();
    console.log("Logged In", formState.inputs);
  };

  return (
    <Card className="authentication">
      {isLoginMode ? <h2>Log In</h2> : <h2>Create Your new Account</h2>}
      <form onSubmit={authSubmitFormHandler}>
        {!isLoginMode && (
          <Input
            id="nickname"
            element="input"
            type="text"
            label="Nickname"
            validators={[VALIDATOR_REQUIRE]}
            errorText="Please enter a valid nickname."
            onInput={inputHandler}
          />
        )}
        <Input
          id="emailAddress"
          element="input"
          type="text"
          label="Email Address"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Please enter a password at least 8 characters long."
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "Login" : "Sign Up"}
        </Button>
      </form>
      <div className="authentication__register-container">
        {isLoginMode
          ? " Don't have an account yet? "
          : "Already have an account? "}
        <p onClick={switchModeHandler}>
          {" "}
          {isLoginMode
            ? "create a YourPlace Account"
            : "login with your YourPlace Account"}
        </p>
      </div>
    </Card>
  );
};

export default Auth;
