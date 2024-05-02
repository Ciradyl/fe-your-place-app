import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom/";

import { Button, Input } from "../../shared/components/FormElements/__index__";
import {
  Card,
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

const UpdatePlace = () => {
  const authContext = useContext(AUTHENTICATION_CONTEXT);
  const { isLoading, errorOccured, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();

  const updatePlaceHistory = useHistory();
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await sendRequest(
          YOUR_PLACE_API_URLS.PLACES_GET_BY_ID + placeId
        );
        setLoadedPlace(response.places);
        setFormData(
          {
            title: { value: response.places.title, isValid: true },
            description: { value: response.places.description, isValid: true },
          },
          true
        );
      } catch (e) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        YOUR_PLACE_API_URLS.PLACES_GET_BY_ID + placeId,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        { "Content-Type": "application/json" }
      );
      updatePlaceHistory.push(
        YOUR_PLACE_API_URLS.HOME + authContext.userId + "/places"
      );
    } catch (e) {}
  };

  return (
    <>
      {isLoading ? (
        <div className="center">
          <LoadingSpinner />
        </div>
      ) : loadedPlace && !errorOccured ? (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter an appropriate description (at least 5 characters)."
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Update Place
          </Button>
        </form>
      ) : (
        <div className="center">
          <Card>
            <h2>Could not find the place!</h2>
          </Card>
        </div>
      )}
      {errorOccured && <ErrorModal error={errorOccured} onClear={clearError} />}
    </>
  );
};

export default UpdatePlace;
