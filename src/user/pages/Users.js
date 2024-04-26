import React, { useEffect, useState } from "react";

import { UsersList } from "../__index__";
import {
  ErrorModal,
  LoadingSpinner,
} from "../../shared/components/UIElements/__index__";
import { YOUR_PLACE_API_URLS } from "../../shared/util/api";
import { DUMMY_USERS } from "../DUMMY_USERS";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorOccured, setErrorOccured] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(YOUR_PLACE_API_URLS.USERS);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setLoadedUsers(data.users);
      } catch (e) {
        setErrorOccured(e.message);
      }
      setIsLoading(false);
    };
    fetchRequest();
  }, []);

  const errorHandler = () => {
    setErrorOccured(null);
  };
  return (
    <>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
      <ErrorModal error={errorOccured} onClear={errorHandler} />
    </>
  );
};

export default Users;
