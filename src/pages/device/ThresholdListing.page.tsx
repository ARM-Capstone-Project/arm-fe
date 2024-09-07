import SensorReading from "./interfaces/SensorReading";

const SensorReadingList: React.FC<SensorReading[]> = ({ readings }) => {
  return (
    <div className="container mx-auto">
      
      <table className="table-auto w-full rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600 font-semibold">
            <th className="p-3">Device ID</th>
            <th className="p-3">Sensor ID</th>
            <th className="p-3">Reading</th>
            <th className="p-3">Condition</th>
            <th className="p-3">Email</th>
            <th className="p-3">Level</th>
            <th className="p-3">Unit</th>
          </tr>
        </thead>
        <tbody>
          {readings.map((reading) => (
            <tr key={reading.deviceId + reading.sensorId} className="border-b">
              <td className="p-3">{reading.deviceId}</td>
              <td className="p-3">{reading.sensorId}</td>
              <td className="p-3">{reading.reading}</td>
              <td className="p-3">{reading.condition}</td>
              <td className="p-3">{reading.email}</td>
              <td className="p-3">{reading.level}</td>
              <td className="p-3">{reading.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensorReadingList;