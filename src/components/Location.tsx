"use client"

import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';


const containerStyle = {
    width: '80vw',
    height: '60vh'
  };
  
  const center = {
    lat: -14.351408617056887,
    lng: -72.91964769122771
  };

  /*
  -14.35126224637826, -72.9196684635715
  -14.351074898387942, -72.91856896857439
  -14.351408617056887, -72.91964769122771
  */

export function Location() {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!
      })

    return(
        <section id="location" className="relative flex items-center justify-center mt-[10%]">
            {
                isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={center}
                      zoom={16}
                    >
                      { /* Child components, such as markers, info windows, etc. */ }
                      <Marker 
                      position={center}
                      />
                      <></>
                    </GoogleMap>
                ) : <></>
            }
        </section>
    )
}