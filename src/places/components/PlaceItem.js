import React, { useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";

import "./PlaceItem.css";

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const showDeleteModalHandler = () => {
    setShowDeleteModal(true);
  };

  const cancelDeleteModalHandler = () => {
    setShowDeleteModal(false);
  };

  const deletePlaceHandler = () => {
    setShowDeleteModal(false)
    console.log("Deleted");
  };

  return (
    <>
      {/* Main Body */}
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.imageUrl} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              View on Map
            </Button>
            <Button to={`/places/${props.id}`}>Edit</Button>
            <Button onClick={showDeleteModalHandler}>Delete</Button>
          </div>
        </Card>
      </li>

      {/* Map Modal section */}
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={15} />
        </div>
      </Modal>

      {/* Deletion Modal section */}
      <Modal
        show={showDeleteModal}
        onCancel={cancelDeleteModalHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={deletePlaceHandler}>
              {" "}
              Delete
            </Button>
            <Button onClick={cancelDeleteModalHandler}>
              {" "}
              Cancel
            </Button>
          </>
        }
      >
        <p>Do you want to delete this place?</p>
      </Modal>
    </>
  );
};

export default PlaceItem;
