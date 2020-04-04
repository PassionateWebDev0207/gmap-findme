import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
const mapboxToken = 'pk.eyJ1IjoicGFzc2lvbmRldiIsImEiOiJjandqem9xbmkwaDgxNGFxZ2VwcXlmaXlzIn0.LnISKimehOGVZtLucxbZng';
const mapboxApiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const mapStyle = 'mapbox://styles/mapbox/streets-v8';
const mapContainerStyle = {
  height: '100%',
  width: '100%'
}
const Map = ReactMapboxGl({ accessToken: mapboxToken });

export { 
	Map,
	Layer,
	Feature,
	Popup,
	mapboxToken,
	mapboxApiUrl,
	mapStyle,
	mapContainerStyle
};