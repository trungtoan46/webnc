import React from 'react';

const ChartCard = ({ title, subtitle, children, extra }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        {subtitle && (
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">{subtitle}</span>
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
      </div>
      
      {extra && <div className="mb-6">{extra}</div>}
      
      {children || (
        <div className="h-48 bg-gray-50 rounded-md flex items-center justify-center border border-gray-200">
          <p className="text-gray-500 font-medium">Chart Visualization</p>
        </div>
      )}
    </div>
  );
};

export default ChartCard; 