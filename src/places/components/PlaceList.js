import React from "react";

import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";

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
                imageUrl={place.imageUrl}
                title={place.title}
                description={place.description}
                address={place.address}
                creatorId={place.creatorId}
                coordinates={place.coordinates}
              />
            </ul>
          );
        })
      ) : (
        <div className="place-list center">
          <Card>
            <h2>There's nothing in here. Maybe create one?</h2>
            <button>Share Place</button>
          </Card>
        </div>
      )}
    </>
  );
};

export default PlaceList;
