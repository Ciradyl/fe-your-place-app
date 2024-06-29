import React from "react";

import { Card } from "../../shared/components/UIElements/__index__";
import { Button } from "../../shared/components/FormElements/__index__";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";

//TODO: Create a state where the share place button is only shown if its their own places. not others

const PlaceList = (props) => {
  return (
    <>
      {props.items.length ? (
        props.items.map((place) => {
          return (
            <ul className="place-list">
              <PlaceItem
                key={place.id}
                id={place.id}
                image={place.image}
                title={place.title}
                description={place.description}
                address={place.address}
                creatorId={place.creatorId}
                coordinates={place.coordinates}
                onDelete={props.onDelete}
              />
            </ul>
          );
        })
      ) : (
        <div className="place-list center">
          <Card>
            <h2>No Places found. Be the first one to share!</h2>
            <Button to="/places/new">Share Place</Button>
          </Card>
        </div>
      )}
    </>
  );
};

export default PlaceList;
