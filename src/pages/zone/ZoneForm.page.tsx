import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';

interface ZoneFormProps {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
}

const ZoneForm: React.FC<ZoneFormProps> = ({ code = '', name = '', description = '' }) => {
    const { id } = useParams<{ id?: string }>();
    const [zoneCode, setZoneCode] = useState(code);
    const [zoneName, setZoneName] = useState(name);
    const [zoneDescription, setZoneDescription] = useState(description);
    const navigate = useNavigate();
    const isEdit = !!id;

    useEffect(() => {
        if (id) {
            // Fetch existing zone data if in edit mode
            const fetchZoneData = async () => {
                try {
                    // const response = await fetch(`/api/zones/${id}`);
                    // const data = await response.json();
                    const data = {
                        code: "BT01",
                        name: "Bishan",
                        description: "This is Bishan"
                    }
                    setZoneCode(data.code);
                    setZoneName(data.name);
                    setZoneDescription(data.description);
                } catch (error) {
                    console.error('Error fetching zone data:', error);
                }
            };
            fetchZoneData();
        }
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch(id ? `/api/zones/${id}` : '/api/zones', {
                method: id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: zoneCode, name: zoneName, description: zoneDescription }),
            });
            if (response.ok) {
                navigate('/zones');
            } else {
                console.error(`Failed to ${id ? 'update' : 'create'} zone`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex">
            <div className="w-1/2">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        {isEdit ? 'Edit Zone' : 'Create New Zone'}
                    </h1>
                    <button
                        onClick={() => navigate('/zones')}
                        className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                        Back
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mb-4">
                            <label className="mb-2 text-gray-700">Code</label>
                            <input
                                type="text"
                                placeholder="Enter zone code"
                                value={zoneCode}
                                onChange={(e) => setZoneCode(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                required
                            />
                        </div>
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
                            <label className="mb-2 text-gray-700">Description</label>
                            <textarea
                                placeholder="Enter zone description"
                                value={zoneDescription}
                                onChange={(e) => setZoneDescription(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                rows={4}
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg`}
                            >
                                {isEdit ? 'Update' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="w-1/2 p-4">
                <MapContainer center={[1.3521, 103.8198]} zoom={12} style={{ height: '70vh', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                </MapContainer>
            </div>
        </div>
    );
};

export default ZoneForm;
