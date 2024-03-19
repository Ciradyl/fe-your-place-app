import React from "react";

import UserItem from "./UserItem";
import "./UserList.css";

const UsersList = (props) => {
  return (
    <ul>
      {props.items.length ? (
        props.items.map((user) => {
          return (
            <UserItem
              key={user.id}
              id={user.id}
              image={user.image}
              name={user.name}
              placeCount={user.places}
            />
          );
        })
      ) : (
        <div className="center">
          <h2>No Users found!</h2>
        </div>
      )}
    </ul>
  );
};

export default UsersList;
