import React from "react";

import UserItem from "./UserItem";
import {Card} from "../../shared/components/UIElements/__index__";
import "./UserList.css";

const UsersList = (props) => {
  return (
    <>
      {props.items.length ? (
        props.items.map((user) => {
          return (
            <ul className="users-list">
              <UserItem
                key={user.id}
                id={user.id}
                image={user.image}
                name={user.name}
                placeCount={user.places.length}
              />
            </ul>
          );
        })
      ) : (
        <div className="center">
          <Card>
            <h2>No Users found!</h2>
          </Card>
        </div>
      )}
    </>
  );
};

export default UsersList;
