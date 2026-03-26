import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, OverlayViewF, StandaloneSearchBox } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const defaultCenter = {
  lat: 37.807,
  lng: -122.4176,
};

const LIBRARIES: 'places'[] = ['places'];

interface Props {
  markers: { lat: number; lng: number; name?: string; image?: string }[];
  CustomMarker?: React.ReactNode;
  width?: string;
  height?: string;
  zoom?: number;
  withSearch?: boolean;
  zoomControl?: boolean;
  streetViewControl?: boolean;
  mapTypeControl?: boolean;
  fullscreenControl?: boolean;
  center?: { lat: number; lng: number };
}

export const UserPinMarker = ({ position, image }: { position: { lat: number; lng: number }; image: string }) => {
  return (
    <OverlayViewF
      position={position}
      mapPaneName="overlayMouseTarget"
      getPixelPositionOffset={(width, height) => ({
        x: -(width / 2),
        y: -height,
      })}
    >
      <div className="relative flex flex-col items-center">
        {/* Pin circle with image */}
        <div className="w-8 h-8 rounded-full border-4 border-red-500 bg-white overflow-hidden shadow-lg">
          <img src={image} alt="marker" className="w-full h-full object-cover" />
        </div>

        {/* Pin pointer */}
        <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] border-l-transparent border-r-transparent border-t-red-500 -mt-1"></div>

        {/* Ripple effect */}
        <div className="absolute top-8 w-6 h-6 bg-error-500/30 rounded-full"></div>
      </div>
    </OverlayViewF>
  );
};

const MemoUserPinMarker = React.memo(UserPinMarker);

export const MapWithSearch = ({ markers, width, height, zoom, CustomMarker, withSearch, zoomControl, streetViewControl, mapTypeControl, fullscreenControl, center }: Props) => {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: LIBRARIES,
  });

  const handlePlacesChanged = () => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        if (place.geometry?.location) {
          const location = place.geometry.location;
          const newMarker = { lat: location.lat(), lng: location.lng() };
          mapRef?.panTo(newMarker);
        }
      }
    }
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div style={{ width: width || '100%', height: height || '500px' }}>
      {withSearch && (
        <StandaloneSearchBox onLoad={(ref) => setSearchBox(ref)} onPlacesChanged={handlePlacesChanged}>
          <input type="text" placeholder="Search places..." className="h-11 w-full border border-neutral-975 rounded-xl px-4 mb-4" />
        </StandaloneSearchBox>
      )}

      <GoogleMap
        clickableIcons={false}
        mapContainerStyle={{
          width: width || `100%`,
          height: height || `400px`,
        }}
        options={{
          zoomControl: zoomControl ?? false,
          streetViewControl: streetViewControl ?? false,
          mapTypeControl: mapTypeControl ?? false,
          fullscreenControl: fullscreenControl ?? false,
        }}
        center={markers?.length > 0 && (markers[0]?.lat || markers[0]?.lng || !isNaN(markers[0]?.lat) || !isNaN(markers[0]?.lng)) ? markers[0] : defaultCenter}
        zoom={zoom ?? 13}
        onLoad={(map) => setMapRef(map)}
      >
        {markers?.map((marker, index) => {
          if (!marker?.lat || !marker?.lng || isNaN(marker?.lat) || isNaN(marker?.lng)) return null;
          return CustomMarker ? <div key={index}>{CustomMarker}</div> : <MemoUserPinMarker key={index} position={marker} image={marker?.image! ?? '/images/user-default.png'} />;
        })}
      </GoogleMap>
    </div>
  );
};
