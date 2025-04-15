import React from 'react';
import StatsCard from './dashboard/StatsCard';
import ChartCard from './dashboard/ChartCard';
import DataTable from './dashboard/DataTable';

const Dashboard = ({ stats, recentTransactions, topProducts }) => {
  return (
    <div className="p-6 w-full">
      <div className="flex justify-between mb-6 w-full">
        <h2 className="text-xl font-semibold text-blue-600">Dashboard</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Manage</span>
        </button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-6 mb-8 w-full">
        <StatsCard
          title="Total Sales"
          value={stats.totalSales}
          change="↑ 22.4%"
          color="blue"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders}
          change="↑ 15.8%"
          color="blue"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          }
        />
        
        <StatsCard
          title="Unique Visits"
          value={stats.uniqueVisits}
          change="↓ 10.2%"
          color="yellow"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          }
        />
        
        <StatsCard
          title="New Users"
          value={stats.newUsers}
          change="↑ 12.5%"
          color="green"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
        
        <StatsCard
          title="Page Views"
          value={stats.pageViews}
          change="↑ 22.6%"
          color="purple"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
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
      
      {/* Recent Transactions and Top Products */}
      <div className="grid grid-cols-2 gap-6 w-full">
        <DataTable
          title="Recent Transactions"
          columns={["Name", "Date", "Amount", "Status"]}
          data={recentTransactions}
          renderRow={(transaction, index) => (
            <tr key={transaction.id || index} className="border-b last:border-b-0">
              <td className="py-3 text-gray-800 font-medium">{transaction.name}</td>
              <td className="py-3 text-gray-600">{transaction.date}</td>
              <td className="py-3 text-gray-800 font-medium">{transaction.amount}</td>
              <td className="py-3">
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  transaction.status === 'Paid' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {transaction.status}
                </span>
              </td>
            </tr>
          )}
        />
        
        <DataTable
          title="Top Products by Units Sold"
          columns={["Name", "Price", "Units Sold"]}
          data={topProducts}
          renderRow={(product, index) => (
            <tr key={product.id || index} className="border-b last:border-b-0">
              <td className="py-3 flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-md mr-2 flex-shrink-0"></div>
                <span className="text-gray-800 font-medium">{product.name}</span>
              </td>
              <td className="py-3 text-gray-800 font-medium">{product.price}</td>
              <td className="py-3 text-gray-800 font-medium">{product.unitsSold}</td>
            </tr>
          )}
        />
      </div>
    </div>
  );
};

export default Dashboard; 