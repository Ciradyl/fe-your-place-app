import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./PlaceForm.css";

import { DUMMY_PLACES } from "../DUMMY_PLACES";
import { useForm } from "../../shared/hooks/form-hook";

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    //Initializes an callback
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    false
  );

  // Load when finished fetching
  const DISCOVERED_PLACE = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    if (DISCOVERED_PLACE) {
      setFormData(
        {
          title: { value: DISCOVERED_PLACE.title, isValid: true },
          description: { value: DISCOVERED_PLACE.description, isValid: true },
        },
        true
      );
    }

    setIsLoading(false);
  }, [setFormData, DISCOVERED_PLACE]);

  const placeUpdateSubmitHandler = (e) => {
    e.preventDefault();
    console.log("Form Updated", formState.inputs);
  };

  return (
    <>
      {isLoading ? (
        <div className="center">
          <h2>Loading...</h2>
        </div>
      ) : (
        <>
          {DISCOVERED_PLACE ? (
            <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
              <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
              />
              <Input
                id="description"
                element="textrea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter an appropriate description (at least 5 characters)."
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid}
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
        </>
      )}
    </>
  );
};

export default UpdatePlace;
