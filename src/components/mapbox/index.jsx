import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
import './mapbox.scss'
const mapboxToken = 'pk.eyJ1IjoiY29tbW9kaXR5dmVjdG9ycyIsImEiOiJjamR3eWFvd3owcTUwMzRzNmg1eXJjYWlzIn0.QESIireyCutiiFOTlI4y5w';
const mapboxApiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const mapStyle = 'mapbox://styles/mapbox/streets-v8';
const mapContainerStyle = {
  height: '100%',
  width: '100%'
};
const Map = ReactMapboxGl({ accessToken: mapboxToken });

const Mapbox = () => {
  const [position, setPosition] = useState({lat: 53.631611, lng: -113.323975});
  const [popup, setPopup] = useState(false);
  const [zoom, setZoom] = useState(5);
  const [address, setAddress] = useState([]);

  const getCurrentLocation = () => {
    setPopup(false);
    const geo = navigator.geolocation;
    geo.getCurrentPosition(({coords}) => {
      setPosition({
        lat: coords.latitude,
        lng: coords.longitude,
      });
      // fetch address using coordinates
      fetch(`${mapboxApiUrl}${coords.longitude},${coords.latitude}.json?access_token=${mapboxToken}`)
      .then(response => response.json())
      .then(res => {
        setAddress(res.features[0].place_name.split(','));
        setPopup(true);
      })
      .catch(error => {
        console.error(error);
      })
    });
  }

  const onClickPlus = () => {
    setZoom(zoom + 2 > 24 ? 24 : zoom + 2)
  }

  const onClickMinus = () => {
    setZoom(zoom - 2 < 0 ? 0 : zoom - 2)
  }

  return (
    <div className="map-container">
      <div className="map-control">
        <button onClick={() => getCurrentLocation()}>
          <i className="fa fa-crosshairs" />
        </button>
        <button onClick={() => onClickPlus()}>
          <i className="fa fa-plus" />
        </button>
        <button onClick={() => onClickMinus()}>
          <i className="fa fa-minus" />
        </button>
        <Link to="/google-map">
          <i className="fa fa-exchange" />
        </Link>
      </div>
      <Map
        // eslint-disable-next-line react/style-prop-object
        style={mapStyle}
        containerStyle={mapContainerStyle}
        center={[position.lng, position.lat]}
        zoom={[zoom]}
      >
        {
          popup && 
          (<Popup coordinates={[position.lng, position.lat]}>
            {
              address.map((item, index) => {
                return (<p key={index}>{item}</p>)
              })
            }
          </Popup>)
        }
        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
          <Feature coordinates={[position.lng, position.lat]} />
        </Layer>
      </Map>
    </div>
  )
}

export default Mapbox;