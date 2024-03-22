import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import { DUMMY_PLACES } from "../DUMMY_PLACES";


const UserPlaces = () => {
  const USER_ID = useParams().userId;
  const LOADED_PLACES = DUMMY_PLACES.filter(
    (place) => place.creatorId === USER_ID
  );

  return <PlaceList items={LOADED_PLACES} />;
};

export default UserPlaces;
