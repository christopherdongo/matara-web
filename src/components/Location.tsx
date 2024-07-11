"use client";

import {useState, useCallback, useRef, memo} from "react";
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

const placeId = "ChIJGx-MnN-cbJERtx6DCH3nwsc"

interface googleMap {
  lat: string
  lng: string

}


function Location() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!,  // Reemplaza esto con tu API key
    libraries: ['places']
  });

  const [map, setMap] = useState(null) as any;
  const [mapType, setMapType] = useState("roadmap");
  const [markerPosition, setMarkerPosition] = useState(null) as any;
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [placeDetails, setPlaceDetails] = useState(null) as any;


  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);


  const onLoad = useCallback(function callback(map : any) {
    setMap(map);
  },[])

  const toggleMapType = () => {
    setMapType((prevType) => (prevType === "roadmap" ? "hybrid" : "roadmap"));
  };

  const handleMapClick = (e: any) => {
    const clickedPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };

    setMarkerPosition(clickedPosition);
    setShowInfoWindow(false);

    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      placeId,
      fields: ['name', 'formatted_address', 'rating', 'user_ratings_total', 'url']
    };

    service.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaceDetails(place);
        setShowInfoWindow(true);
      }
    });
  };

  const getInfoWindowContent = () => {
    if (!placeDetails) return "";

    const { name, formatted_address, rating, user_ratings_total, url } = placeDetails;

    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 ? 1 : 0;

    const starElements = [];
    for (let i = 0; i < fullStars; i++) {
      starElements.push('<div class="icon rating-star rating-full-star"></div>');
    }
    if (halfStar) {
      starElements.push('<div class="icon rating-star rating-half-star"></div>');
    }

    return `
      <div style="position: absolute; left: 0px; top: 0px;">
        <div style="background-color: white; margin: 10px; padding: 1px; box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; border-radius: 2px;">
          <div jstcache="0" style="">
            <div jstcache="51" class="place-card place-card-large">
              <div class="place-desc-large">
                <div jstcache="24" class="place-name">${name}</div>
                <div jstcache="25" class="address">${formatted_address}</div>
              </div>
              <div jstcache="26" class="navigate">
                <div jsaction="placeCard.directions" class="navigate">
                  <a aria-label="Get directions to this location on Google Maps." target="_blank" jstcache="38" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(formatted_address)}&travelmode=driving" class="navigate-link">
                    <div class="icon navigate-icon"></div>
                    <div jstcache="39" class="navigate-text">Directions</div>
                  </a>
                </div>
                <div class="tooltip-anchor">
                  <div class="tooltip-tip-outer"></div>
                  <div class="tooltip-tip-inner"></div>
                  <div class="tooltip-content">
                    <div jstcache="40">Get directions to this location on Google Maps.</div>
                  </div>
                </div>
              </div>
              <div class="review-box">
                <div aria-hidden="true" jstcache="27" class="review-number">${rating}</div>
                <div aria-label="Rated ${rating} out of 5" role="img" jstcache="28" class="rating-stars">
                  ${starElements.join('')}
                </div>
                <a aria-label="${user_ratings_total} reviews" target="_blank" jstcache="30" href="${url}" jsaction="mouseup:placeCard.reviews" class="review-box-link">${user_ratings_total} reviews</a>
              </div>
              <div class="bottom-actions">
                <div class="google-maps-link">
                  <a aria-label="View larger map" target="_blank" jstcache="31" href="https://maps.google.com/maps?ll=${center.lat},${center.lng}&z=16&t=m&hl=en-US&gl=US&mapclient=embed&cid=${placeId}" jsaction="mouseup:placeCard.largerMap">View larger map</a>
                </div>
              </div>
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
                {markerPosition && (
          <Marker position={markerPosition} onClick={() => setShowInfoWindow(true)} />
        )}
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
                    {mapType === "roadmap" ? "Satelital" : "Mapa"}
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


export default memo(Location)