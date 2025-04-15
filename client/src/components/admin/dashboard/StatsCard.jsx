import React from 'react';

const StatsCard = ({ title, value, change, icon, color }) => {
  const isPositive = !change.startsWith('↓');
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-700 font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          <p className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'} font-medium mt-1`}>
            {change}
          </p>
        </div>
        <div className={`bg-${color}-100 p-2 rounded-md text-${color}-600`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard; 