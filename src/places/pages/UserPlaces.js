import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import {
  ErrorModal,
  LoadingSpinner,
} from "../../shared/components/UIElements/__index__";
import { YOUR_PLACE_API_URLS } from "../../shared/util/api";
import { useHttpClient } from "../../shared/hooks/http-hooks";

const UserPlaces = () => {
  const { isLoading, errorOccured, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const USER_ID = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await sendRequest(
          YOUR_PLACE_API_URLS.PLACES_GET_BY_USER_ID + USER_ID
        );
        setLoadedPlaces(response.places);
      } catch (e) {}
    };
    fetchPlaces();
  }, [sendRequest, USER_ID]);

  const deletePlaceHandler = useCallback(
    (deletedPlaceId) => {
      setLoadedPlaces((prevPlaces) =>
        prevPlaces.filter((place) => place.id !== deletedPlaceId)
      );
    },
    [setLoadedPlaces]
  );

  return (
    <>
      <ErrorModal error={errorOccured} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDelete={deletePlaceHandler} />
      )}
    </>
  );
};

export default UserPlaces;
