import React, { ReactNode } from 'react';

interface TableProps {
  headers: ReactNode; // The content of the thead
  rows: ReactNode; // The content of the tbody
}

const Table: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                {headers}
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {rows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
