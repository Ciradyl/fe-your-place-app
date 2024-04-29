import React, { useEffect, useState } from "react";

import { UsersList } from "../__index__";
import {
  ErrorModal,
  LoadingSpinner,
} from "../../shared/components/UIElements/__index__";
import { useHttpClient } from "../../shared/hooks/http-hooks";
import { YOUR_PLACE_API_URLS } from "../../shared/util/api";

const Users = () => {
  const { isLoading, errorOccured, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState([]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await sendRequest(YOUR_PLACE_API_URLS.USERS);
        setLoadedUsers(response.users);
      } catch (e) {}
    };
    fetchRequest();
  }, [sendRequest]);

  return (
    <>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers.length > 0 && <UsersList items={loadedUsers} />}
      <ErrorModal error={errorOccured} onClear={clearError} />
    </>
  );
};

export default Users;