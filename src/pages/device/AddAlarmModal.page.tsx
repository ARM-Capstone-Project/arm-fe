import React from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (newAlarm: any) => void;
}

const AddAlrmModal: React.FC<ModalProps> = ({ show, onClose, onSave }) => {
  const [alarmName, setAlarmName] = useState('');
  const [alert, setAlert] = useState('');
  const [sendVia, setSendVia] = useState('Email');
  const [sendTo, setSendTo] = useState('');

  if (!show) {
    return null;
  }

  const handleSave = () => {
    const newAlarm = {
      id: Date.now(), // Or any other unique identifier
      alarmName,
      alert,
      sendVia,
      sendTo,
      enabled: false,
    };
    onSave(newAlarm);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h3 className="text-lg font-bold mb-4">Add New Alarm</h3>
        <div className="mb-4">
          <label className="block text-gray-700">Alarm Name</label>
          <input
            type="text"
            value={alarmName}
            onChange={(e) => setAlarmName(e.target.value)}
            className="w-full px-4 py-2 border rounded mt-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Alert</label>
          <input
            type="text"
            value={alert}
            onChange={(e) => setAlert(e.target.value)}
            className="w-full px-4 py-2 border rounded mt-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Send Via</label>
          <select
            value={sendVia}
            onChange={(e) => setSendVia(e.target.value)}
            className="w-full px-4 py-2 border rounded mt-2"
          >
            <option value="Email">Email</option>
            <option value="SMS">SMS</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Send To</label>
          <input
            type="email"
            value={sendTo}
            onChange={(e) => setSendTo(e.target.value)}
            className="w-full px-4 py-2 border rounded mt-2"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAlrmModal;
