import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import api from "../../api/index";

interface ZoneFormProps {
  id?: string;
  name?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
}

const ZoneForm: React.FC<ZoneFormProps> = ({ name = "" }) => {
  const { id } = useParams<{ id?: string }>();
  const [zoneName, setZoneName] = useState(name);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [radius, setRadius] = useState<number>(0);
  const navigate = useNavigate();
  const isEdit = !!id;

  useEffect(() => {
    if (id) {
      const fetchZoneData = async () => {
        try {
          const response = await api.get(`/zones/${id}`);
          const data = response.data as ZoneFormProps;
          setZoneName(data.name || "");
          setLatitude(data.latitude ?? null);
          setLongitude(data.longitude ?? null);
          setRadius(data.radius ?? 0);
        } catch (error) {
          console.error("Error fetching zone data:", error);
        }
      };
      fetchZoneData();
    }
  }, [id]);

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.post("/zones", {
        name: zoneName,
        latitude,
        longitude,
        radius,
      });

      if (response.status === 200) {
        navigate("/zones");
      } else {
        console.error("Failed to create zone");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.put(`/zones/${id}`, {
        name: zoneName,
        latitude,
        longitude,
        radius,
      });
      if (response.status === 200) {
        navigate("/zones");
      } else {
        console.error("Failed to update zone");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    if (isEdit) {
      handleUpdate(event);
    } else {
      handleCreate(event);
    }
  };

  const handleMapClick = (event: any) => {
    const { lat, lng } = event.latlng;
    setLatitude(lat);
    setLongitude(lng);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex">
      <div className="w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {isEdit ? "Edit Zone" : "Create New Zone"}
          </h1>
          <button
            onClick={() => navigate("/zones")}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Back
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label className="mb-2 text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Enter zone name"
                value={zoneName}
                onChange={(e) => setZoneName(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 text-gray-700">Latitude</label>
              <input
                type="number"
                placeholder="Enter latitude"
                value={latitude ?? ""}
                onChange={(e) => setLatitude(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 text-gray-700">Longitude</label>
              <input
                type="number"
                placeholder="Enter longitude"
                value={longitude ?? ""}
                onChange={(e) => setLongitude(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 text-gray-700">Radius (in meters)</label>
              <input
                type="number"
                placeholder="Enter radius"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg`}
              >
                {isEdit ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="w-1/2 p-4">
        <MapContainer
          center={[1.3521, 103.8198]}
          zoom={12}
          style={{ height: "70vh", width: "100%" }}
          onClick={handleMapClick}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {latitude && longitude && (
            <>
              <Marker position={[latitude, longitude]}>
                <Popup>
                  Latitude: {latitude}, Longitude: {longitude}
                </Popup>
              </Marker>
              <Circle
                center={[latitude, longitude]}
                radius={radius}
                pathOptions={{
                  color: "blue",
                  fillColor: "blue",
                  fillOpacity: 0.3,
                }}
              />
            </>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default ZoneForm;
