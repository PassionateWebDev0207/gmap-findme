import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import './google-map.scss';
const apiMaps = 'AIzaSyDyfzVdtqtjACUbG9vt22O4a93L5OFmSHk';
const mapboxToken = 'pk.eyJ1IjoiY29tbW9kaXR5dmVjdG9ycyIsImEiOiJjamR3eWFvd3owcTUwMzRzNmg1eXJjYWlzIn0.QESIireyCutiiFOTlI4y5w';
const mapboxApiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

const GoogleMap = (props) => {

  const [position, setPosition] = useState({lat: 53.631611, lng: -113.323975});
  const [ready, setReady] = useState(false);
  const [address, setAddress] = useState([]);
  const [marker, setMarker] = useState({});
  const [zoom, setZoom] = useState(5);

  const getCurrentLocation = () => {
    setReady(false);
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
        setReady(true);
      })
      .catch(error => {
        console.error(error);
      })
    });
  }

  const onMarkerClick = (props, marker, e) => {
    setMarker(marker);
  }

  const onClickPlus = () => {
    setZoom(zoom + 2 > 24 ? 24 : zoom + 2)
  }

  const onClickMinus = () => {
    setZoom(zoom - 2 < 0 ? 0 : zoom - 2)
  }  

  return (
    <div className="gmap-container">
      <div className="gmap-control">
        <button onClick={() => getCurrentLocation()}>
          <i className="fa fa-crosshairs" />
        </button>
        <button onClick={() => onClickPlus()}>
          <i className="fa fa-plus" />
        </button>
        <button onClick={() => onClickMinus()}>
          <i className="fa fa-minus" />
        </button>
        <Link to="/mapbox">
          <i className="fa fa-exchange" />
        </Link>
      </div>
      <Map
        google={props.google}
        zoom={zoom}
        initialCenter={{ lat: position.lat, lng: position.lng }}
        center={{ lat: position.lat, lng: position.lng }}
      >
        <Marker
          onClick={onMarkerClick}
          position={{ lat: position.lat, lng: position.lng }}
        />
        {
          ready && (
          <InfoWindow marker={marker} visible={true}>
            {
              address.map((item, index) => {
                return (<p key={index}>{item}</p>)
              })
            }
          </InfoWindow>)
        }
      </Map>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: apiMaps
})(GoogleMap);
