import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import {
  Button,
  Input,
  ImageUpload,
} from "../../shared/components/FormElements/__index__";
import {
  ErrorModal,
  LoadingSpinner,
} from "../../shared/components/UIElements/__index__";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./PlaceForm.css";
import { useHttpClient } from "../../shared/hooks/http-hooks";
import { useForm } from "../../shared/hooks/form-hook";
import { AUTHENTICATION_CONTEXT } from "../../shared/context/auth-context";
import { YOUR_PLACE_API_URLS } from "../../shared/util/api";

const NewPlace = () => {
  const authContext = useContext(AUTHENTICATION_CONTEXT);
  const { isLoading, errorOccured, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const placeHistory = useHistory();

  const placeSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      
      await sendRequest(YOUR_PLACE_API_URLS.PLACES, "POST", formData, {
        Authorization: "Bearer " + authContext.token
      });

      placeHistory.push(YOUR_PLACE_API_URLS.HOME);
    } catch (e) {}
  };

  return (
    <>
      <ErrorModal error={errorOccured} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <ImageUpload
          center
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image."
        />

        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter an appropriate description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add Place
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
