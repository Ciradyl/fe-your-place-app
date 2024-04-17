import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

import "./Map.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = (props) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(props.center.lng);
  const [lat, setLat] = useState(props.center.lat);
  const [zoom, setZoom] = useState(props.zoom);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    //store new coordinates
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng);
      setLat(map.current.getCenter().lat);
      setZoom(map.current.getZoom().zoom);
    });

    // // add markers to map
    // // create DOM element for the marker
    // const el = document.createElement("div");
    // el.id = "marker";

    // // create the marker
    // new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map.current);

    // // create a default Marker, colored black, rotated 45 degrees.
    // //       const MAP_DEFAULT_MARKER = new mapboxgl.Marker({
    // //         color: "black",
    // //         rotation: 45,
    // //       })
    // //         .setLngLat([map.current.getCenter().lng, map.current.getCenter().lat])
    // //         .addTo(map);
  });

  return (
    <>
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </>
  );
};

export default Map;
