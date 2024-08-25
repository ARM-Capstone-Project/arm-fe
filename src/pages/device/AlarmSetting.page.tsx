import React, { useState, useCallback } from 'react';
import Listing from './ThresholdListing.page';
import type {
  JsonGroup,
  Config,
  ImmutableTree,
  BuilderProps,
} from '@react-awesome-query-builder/ui';
import { Utils as QbUtils, Query, Builder, BasicConfig } from '@react-awesome-query-builder/ui';

const InitialConfig = BasicConfig;
let queryStringToSave: string;
const config: Config = {
  ...InitialConfig,
  fields: {
    'reading': {
      label: "Reading Value",
      type: 'number',
      fieldSettings: {
        min: 0,
      },
      valueSources: ['value'],
      preferWidgets: ['number'],
    }
  },
};

const queryValue: JsonGroup = { id: QbUtils.uuid(), type: 'group' };
const AlarmSettings: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newThreshold, setNewThreshold] = useState({
    deviceId: '',
    sensorId: '',
    email: '',
    level: ''
  });

  const [state, setState] = useState({
    tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
    config: config,
  });
  const onChange = useCallback((immutableTree: ImmutableTree, config: Config) => {
    setState((prevState) => ({ ...prevState, tree: immutableTree, config: config }));
    const jsonTree = QbUtils.getTree(immutableTree);
    console.log(jsonTree);
    queryStringToSave = QbUtils.queryString(immutableTree, config);
    console.log(queryStringToSave);
  }, []);
  const renderBuilder = useCallback(
    (props: BuilderProps) => (
      <div className="query-builder-container" style={{ padding: '10px' }}>
        <div className="query-builder qb-lite">
          <Builder {...props} />
        </div>
      </div>
    ),
    [],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewThreshold({
      ...newThreshold,
      [e.target.name]: e.target.value
    });
  };

  const handleAddThreshold = () => {
    // Here you would typically update the state or call an API to save the new threshold
    console.log('New Threshold:', newThreshold);
    setIsModalOpen(false);
  };


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Threshold Settings</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Threshold
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <Listing />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 max-w-2xl">
            <h3 className="text-2xl font-bold mb-4">Add New Threshold</h3>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deviceId">
                Device Id
              </label>
              <input
                id="deviceId"
                name="deviceId"
                type="text"
                value={newThreshold.deviceId}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sensorId">
                Sensor Id
              </label>
              <input
                id="sensorId"
                name="sensorId"
                type="text"
                value={newThreshold.sensorId}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />

            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">
                Sensor Id
              </label>
              <input
                id="level"
                name="level"
                type="text"
                value={newThreshold.sensorId}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                value={newThreshold.email}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />

            </div>



            <div >
              <Query {...config} value={state.tree} onChange={onChange} renderBuilder={renderBuilder} />
            </div>


            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddThreshold}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Threshold
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AlarmSettings;
