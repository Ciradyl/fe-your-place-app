import React, { useState, useContext } from "react";

import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AUTHENTICATION_CONTEXT } from "../../shared/context/auth-context";
import "./Auth.css";

import { YOUR_PLACE_API_URLS } from "../../shared/util/api";

const Auth = () => {
  const auth = useContext(AUTHENTICATION_CONTEXT);
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
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.emailAddress.isValid &&
          formState.inputs.password.isValid
      );
    } else {
      setFormData(
        { ...formState.inputs, name: { value: "", isValid: false } },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitFormHandler = async (e) => {
    e.preventDefault();

    if (isLoginMode) {
    }

    if (!isLoginMode) {
      try {
        const response = await fetch(YOUR_PLACE_API_URLS.SIGNUP, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            emailAddress: formState.inputs.emailAddress.value,
            password: formState.inputs.password.value,
          }),
        })

        const data = await response.json();
        console.log(data);
      } catch (e) {
        console.log("ERROR", e);
      }
    }

    auth.login();
  };

  return (
    <Card className="authentication">
      {isLoginMode ? <h2>Log In</h2> : <h2>Create Your new Account</h2>}
      <form onSubmit={authSubmitFormHandler}>
        {!isLoginMode && (
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name."
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
