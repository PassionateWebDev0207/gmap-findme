import React, { useState } from 'react';
import {
  Map,
  Layer,
  Feature,
  Popup,
  mapboxToken,
  mapboxApiUrl,
  mapStyle,
  mapContainerStyle 
} from './mapbox_config';
import './mapbox.scss'

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
          <Feature coordinates={[position.lng, position.lat]}>
            <i className="fa fa-map-marker-alt"/>
          </Feature>
        </Layer>
      </Map>
    </div>
  )
}

export default Mapbox;