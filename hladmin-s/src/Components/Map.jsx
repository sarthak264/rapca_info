import React, { useState, useEffect } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/withScriptjs';
import { TextInput } from 'react-admin';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const Map = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ lat: 40.756795, lng: -73.954298 });
  const [address, setAddress] = useState('');
  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    props.setAddress(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        props.setCoOrd(latLng.lat, latLng.lng);
        setCoords({ lat: latLng.lat, lng: latLng.lng });
      })
      .catch((error) => console.error('Error', error));
  };

  const handleToggleOpen = () => {
    setIsOpen(true);
  };

  const handleToggleClose = () => {
    setIsOpen(false);
  };
  const GoogleMapExample = withGoogleMap((propsMap) => (
    <GoogleMap defaultCenter={coords} defaultZoom={13}>
      <Marker
        key={propsMap.index}
        position={coords}
        onClick={() => handleToggleOpen()}
      >
        {isOpen && (
          <InfoWindow
            onCloseClick={handleToggleClose}
            options={{ maxWidth: 100 }}
          >
            <span>This is InfoWindow message!</span>
          </InfoWindow>
        )}
      </Marker>
    </GoogleMap>
  ));

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextInput
              source='Search Places ...'
              style={{ display: 'block' }}
              {...getInputProps({
                className: 'location-search-input',
              })}
            />
            <div className='autocomplete-dropdown-container'>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    key={suggestion.placeId}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <GoogleMapExample
        containerElement={<div style={{ height: `500px`, width: '500px' }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default withScriptjs(Map);
