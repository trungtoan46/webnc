import React from 'react';
import { FiDollarSign, FiShoppingBag, FiUsers, FiEye, FiFileText } from 'react-icons/fi';
import { BiTrendingUp, BiTrendingDown } from 'react-icons/bi';
import ChartCard from './ChartCard';
import DataTable from './DataTable';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div className={`flex items-center ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
        {trend === 'up' ? <BiTrendingUp size={20} /> : <BiTrendingDown size={20} />}
        <span className="ml-1 text-sm font-medium">{trendValue}%</span>
      </div>
    </div>
    <h3 className="text-gray-500 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-semibold text-gray-800">{value}</p>
  </div>
);

const Dashboard = ({ stats, recentTransactions, topProducts }) => {
  const statCards = [
    {
      title: 'Total Sales',
      value: stats.totalSales,
      icon: FiDollarSign,
      trend: 'up',
      trendValue: '22.4',
      color: 'bg-blue-500'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: FiShoppingBag,
      trend: 'up',
      trendValue: '15.8',
      color: 'bg-purple-500'
    },
    {
      title: 'Unique Visits',
      value: stats.uniqueVisits,
      icon: FiEye,
      trend: 'down',
      trendValue: '10.2',
      color: 'bg-yellow-500'
    },
    {
      title: 'New Users',
      value: stats.newUsers,
      icon: FiUsers,
      trend: 'up',
      trendValue: '12.5',
      color: 'bg-green-500'
    },
    {
      title: 'Page Views',
      value: stats.pageViews,
      icon: FiFileText,
      trend: 'up',
      trendValue: '22.6',
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Orders Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="py-2">{transaction.name}</td>
                      <td className="py-2 text-gray-500">{transaction.date}</td>
                      <td className="py-2 font-medium">{transaction.amount}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium
                          ${transaction.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Top Products</h2>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-3">Product</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Units Sold</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {topProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="py-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded bg-gray-200 mr-3"></div>
                          <span>{product.name}</span>
                        </div>
                      </td>
                      <td className="py-2 text-gray-500">{product.price}</td>
                      <td className="py-2 font-medium">{product.unitsSold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-2 gap-6 mb-8 w-full">
        <ChartCard 
          title="Orders Over Time" 
          subtitle="Last 12 Hours"
          extra={
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xl font-bold text-gray-800">645</h4>
                <p className="text-sm text-gray-600 font-medium">Orders on May 22</p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800">472</h4>
                <p className="text-sm text-gray-600 font-medium">Orders on May 21</p>
              </div>
            </div>
          }
        />
        
        <ChartCard 
          title="Last 7 Days Sales"
          extra={
            <div>
              <h4 className="text-xl font-bold text-gray-800">1,259</h4>
              <p className="text-sm text-gray-600 font-medium">Items Sold</p>
              <h4 className="text-xl font-bold mt-2 text-gray-800">$12,546</h4>
              <p className="text-sm text-gray-600 font-medium">Revenue</p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Dashboard; 