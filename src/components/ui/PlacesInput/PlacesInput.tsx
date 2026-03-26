'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { useFormContext, type RegisterOptions } from 'react-hook-form';
import type { Libraries } from '@react-google-maps/api';

const libraries: Libraries = ['places'];

interface Props {
  type: string;
  placeholder: string;
  name: string;
  label: string;
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
  rules?: RegisterOptions;
  classNames?: string;
  onLocationChange: (location: { lat: number; lng: number; city: string; state: string; country: string; countryCode: string; stateCode: string; postalCode: string }) => void;
}

const PlacesInput: React.FC<Props> = ({ type, placeholder, name, label, icon, iconPosition = 'left', rules = {}, classNames = '', onLocationChange }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries,
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const input = watch(name) || '';

  const [locationCoords, setLocationCoords] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });
  const handlePlaceChanged = (autocomplete: google.maps.places.Autocomplete) => {
    const place = autocomplete.getPlace();
    if (!place || !place.geometry) {
      setValue(name, '');
      setLocationCoords({ lat: 0, lng: 0 });
      return;
    }

    const address = place.formatted_address || '';
    setValue(name, address);

    const lat = place.geometry.location!.lat();
    const lng = place.geometry.location!.lng();

    // Initialize location details
    let city = '';
    let state = '';
    let country = '';
    let stateCode = '';
    let countryCode = '';
    let postalCode = '';

    // Extract city, state, country, and country code from address_components
    place.address_components?.forEach((component) => {
      if (component.types.includes('locality')) city = component.long_name;
      if (component.types.includes('administrative_area_level_1')) state = component.long_name;
      stateCode = component.short_name;
      if (component.types.includes('country')) {
        country = component.long_name;
        countryCode = component.short_name;
      }
      if (component.types.includes('postal_code')) {
        postalCode = component.long_name;
      }
    });

    setLocationCoords({ lat, lng });
    onLocationChange({
      lat,
      lng,
      city,
      state,
      country,
      stateCode,
      countryCode,
      postalCode,
    });
  };

  useEffect(() => {
    if (!isLoaded || loadError) return;

    const options = {
      fields: ['formatted_address', 'geometry', 'address_components'],
    };

    if (inputRef.current) {
      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, options);
      autocomplete.addListener('place_changed', () => handlePlaceChanged(autocomplete));

      return () => {
        google.maps.event.clearInstanceListeners(autocomplete);
      };
    }
  }, [isLoaded, loadError]);

  return (
    <div className="mb-4 w-full">
      <label htmlFor={name} className="block whitespace-nowrap text-paragraph font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2 relative">
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          value={input}
          onChange={(e) => setValue(name, e.target.value)}
          className={`block w-full py-3 px-3 rounded-xl border border-gray-light text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none sm:text-paragraph sm:leading-6 ${
            iconPosition === 'left' ? 'pl-12' : ''
          } ${iconPosition === 'right' ? 'pr-12' : ''} ${classNames}`}
          // 👇 Merge both refs
          ref={(el) => {
            register(name, rules).ref(el);
            inputRef.current = el;
          }}
        />
        {icon && <div className={`absolute inset-y-0 flex text-muted items-center ${iconPosition === 'left' ? 'left-3' : 'right-3'}`}>{icon}</div>}
      </div>
      {errors[name] && <span className="text-red-500 text-paragraph">{errors[name]?.message as string}</span>}
    </div>
  );
};

export default PlacesInput;
