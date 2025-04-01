import React from 'react';

const DataTable = ({ title, columns, data, renderRow }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-4 text-gray-700">{title}</h3>
      <table className="w-full">
        <thead className="text-sm text-gray-600 border-b">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="pb-2 text-left font-semibold">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => renderRow(item, index))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable; 