
import { useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Libraries } from '@react-google-maps/api';
import { Problem } from "@/types/problem";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Setting the Google Maps API key
const GOOGLE_MAPS_API_KEY = "AIzaSyCjek3EDL-YfjVPlSH4h2unGCHBDRarQ9w";

// Container style for the map
const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

// Default center (NYC)
const defaultCenter = {
  lat: 40.7831,
  lng: -73.9712
};

// To avoid reloading the LoadScript
// Define libraries as a constant to avoid unnecessary rerenders
const libraries: Libraries = ['places'];

interface MapViewProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  interactive?: boolean;
  markersClickable?: boolean;
  selectedProblem?: Problem | null;
  onMapClick?: (lngLat: { lng: number; lat: number }) => void;
  problems?: Problem[];
}

const MapView = ({
  center = defaultCenter,
  zoom = 12,
  interactive = true,
  markersClickable = true,
  selectedProblem = null,
  onMapClick,
  problems = []
}: MapViewProps) => {
  const navigate = useNavigate();
  const [selectedMarker, setSelectedMarker] = useState<Problem | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: libraries
  });

  // Center map on selected problem
  useEffect(() => {
    if (isLoaded && mapRef.current && selectedProblem) {
      mapRef.current.panTo({
        lat: selectedProblem.location.lat,
        lng: selectedProblem.location.lng
      });
      mapRef.current.setZoom(15);
      setSelectedMarker(selectedProblem);
    }
  }, [isLoaded, selectedProblem]);

  // Handle map click
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (onMapClick && e.latLng) {
      onMapClick({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      });
    }
  };

  // Handle map load
  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  // Show loading or error
  if (loadError) {
    return (
      <div className="relative w-full h-full bg-muted rounded-md overflow-hidden flex items-center justify-center">
        <div className="bg-card p-4 rounded-md shadow-lg text-center">
          <p className="font-medium text-lg">Error Loading Map</p>
          <p className="text-muted-foreground text-sm mt-2">
            {loadError.message}
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="relative w-full h-full bg-muted rounded-md overflow-hidden flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-muted rounded-md overflow-hidden">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        onClick={handleMapClick}
        onLoad={onMapLoad}
        options={{
          disableDefaultUI: !interactive,
          zoomControl: interactive,
          mapTypeControl: interactive,
          streetViewControl: interactive,
          fullscreenControl: interactive
        }}
      >
        {/* Render markers for all problems */}
        {problems.map(problem => (
          <Marker
            key={problem.id}
            position={{
              lat: problem.location.lat,
              lng: problem.location.lng
            }}
            onClick={() => markersClickable && setSelectedMarker(problem)}
            icon={{
              url: `data:image/svg+xml,${encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="${
                    problem.status === 'resolved' ? '#10b981' : 
                    problem.status === 'in-progress' ? '#f59e0b' : 
                    '#ef4444'
                  }"/>
                </svg>
              `)}`,
              scaledSize: new google.maps.Size(24, 24)
            }}
            animation={google.maps.Animation.DROP}
          />
        ))}

        {/* Info window for selected marker */}
        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.location.lat,
              lng: selectedMarker.location.lng
            }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div 
              className="p-2 max-w-[200px] cursor-pointer" 
              onClick={() => navigate(`/problem/${selectedMarker.id}`)}
            >
              <h3 className="font-semibold text-sm">{selectedMarker.title}</h3>
              <p className="text-xs text-gray-500 truncate">
                {selectedMarker.location.address || "No address"}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapView;
