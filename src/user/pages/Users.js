import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "John Smith",
      image: "https://www.freepik.com/free-photos-vectors/profile-pic",
      places: 4,
    },
  ];

  return (
    <>
      <UsersList items={USERS} />
    </>
  );
};

export default Users;
