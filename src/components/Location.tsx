"use client";

import {useState, useCallback, useRef} from "react";
import {GoogleMap, LoadScript ,useJsApiLoader, Marker, InfoWindow} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "60vh",
};

const center = {
  lat: -14.351408617056887,
  lng: -72.91964769122771,
};

const options = {
  mapTypeControl: false,
};

const placeId = "ChIJGx-MnN-cbJERtx6DCH3nwscJ3XJ+C4Q"


export function Location() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!,  // Reemplaza esto con tu API key
    libraries: ['places']
  });

  const [map, setMap] = useState(null) as any;
  const [mapType, setMapType] = useState("roadmap");
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [placeDetails, setPlaceDetails] = useState(null) as any;


  const onLoad = useCallback(function callback(value: any) {
    setMap(value);

    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      placeId,
      fields: ['name', 'formatted_address', 'rating', 'user_ratings_total', 'url']
    };

    service.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaceDetails(place);
      }
    });
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const toggleMapType = () => {
    setMapType((prevType) => (prevType === "roadmap" ? "hybrid" : "roadmap"));
  };

  const handleMarkerClick = () => {
    setShowInfoWindow(true);
  };

  const handleDirectionsClick = () => {
    const destination = `${center.lat},${center.lng}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(url, '_blank');
  };


  const getInfoWindowContent = () => {
    if (!placeDetails) return "";

    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.35; overflow: hidden; white-space: nowrap;">
        <div class="place-card place-card-large">
          <div class="place-desc-large">
            <div class="place-name">${placeDetails?.name}</div>
            <div class="address">${placeDetails?.formatted_address}</div>
          </div>
          <div class="navigate">
            <div jsaction="placeCard.directions" class="navigate">
              <a aria-label="Get directions to this location on Google Maps." target="_blank" href="https://maps.google.com/maps/dir//${placeDetails.name.replace(/ /g, '+')}/@${center.lat},${center.lng},16z/data=!4m5!4m4!1m0!1m2!1m1!1s${placeId}" class="navigate-link">
                <div class="icon navigate-icon"></div>
                <div class="navigate-text">Directions</div>
              </a>
            </div>
            <div class="tooltip-anchor">
              <div class="tooltip-tip-outer"></div>
              <div class="tooltip-tip-inner"></div>
              <div class="tooltip-content">
                <div>Get directions to this location on Google Maps.</div>
              </div>
            </div>
          </div>
          <div class="review-box">
            <div aria-hidden="true" class="review-number">${placeDetails.rating}</div>
            <div aria-label="Rated ${placeDetails?.rating} out of 5" role="img" class="rating-stars">
              ${[...Array(Math.floor(placeDetails?.rating))].map(() => '<div class="icon rating-star rating-full-star"></div>').join('')}
              ${placeDetails?.rating % 1 ? '<div class="icon rating-star rating-half-star"></div>' : ''}
            </div>
            <a aria-label="${placeDetails?.user_ratings_total} reviews" target="_blank" href="${placeDetails?.url}" class="review-box-link">${placeDetails?.user_ratings_total} reviews</a>
          </div>
          <div class="bottom-actions">
            <div class="google-maps-link">
              <a aria-label="View larger map" target="_blank" href="https://maps.google.com/maps?ll=${center.lat},${center.lng}&z=16&t=m&hl=en-US&gl=US&mapclient=embed&cid=${placeId}">View larger map</a>
            </div>
          </div>
        </div>
      </div>
    `;
  };




  return isLoaded ?  (
    <section
      id="location"
      className="relative flex flex-col mt-20 pl-16 pr-16 font-customSang"
    >
      {isLoaded ? (
        <>
          <h2 className="text-4xl col-span-12 mt-12 mb-4">
            Como llegar a matara.
          </h2>
          <div className="grid grid-cols-12">
            <div className="col-span-8">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={16}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={options}
                mapTypeId={mapType}
              >
                {/* Child components, such as markers, info windows, etc. */}
                <Marker position={center} onClick={handleMarkerClick}/>
                {showInfoWindow && placeDetails && (
          <InfoWindow position={center} onCloseClick={() => setShowInfoWindow(false)}>
            <div dangerouslySetInnerHTML={{ __html: getInfoWindowContent() }} />
          </InfoWindow>
        )}
                <div
                  style={{
                    position: "absolute",
                    bottom:2,
                    left: 10,
                    zIndex: 100,
                    background: "#fff",
                    padding: "5px",
                    borderRadius: "5px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                  }}
                >
                  <button onClick={toggleMapType}>
                    {mapType === "roadmap" ? "  Satelital" : "Map"}
                  </button>
                </div>
              </GoogleMap>
            </div>
            <div className="col-span-4"></div>
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  ) : <></>
}
