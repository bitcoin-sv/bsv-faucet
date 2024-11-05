"use client";
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Search, Download, Pause, Trash2 } from 'lucide-react';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date_registered');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`/api/users?search=${search}&sortBy=${sortBy}&order=${order}`);
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, [search, sortBy, order]);

  const handleExport = () => {
    console.log("Exporting users data...");
  };

  const handleRowClick = (user: { user_id: string | number } ) => {
    window.open(`http://test.whatsonchain.com/${user.user_id}`, '_blank');
  };

  const handlePauseAccount = async (userId: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Pause account for user ID: ${userId}`);
  };

  const handleDeleteAccount = async (userId: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Delete account for user ID: ${userId}`);
  };

  // ShantelPeters to fix as per https://github.com/bitcoin-sv/bsv-faucet/pull/35 
/*
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Users</CardTitle>
        <CardDescription className="text-gray-500">
          Manage user accounts and view their details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users"
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export to CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">User ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date Registered</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Total Withdrawn (BSV)</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {users.map((user: User) => (
                  <tr
                  key={user.id}
                  onClick={() => handleRowClick(user)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  </tr>
            ))}
                  
                >
                  <td className="px-4 py-3 text-sm text-gray-900">{user.user_id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{user.email}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role === 'admin' ? 'Admin' : 'User'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(user.date_registered).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{user.total_withdrawn}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handlePauseAccount(user.user_id, e)}
                        className="p-1 text-yellow-600 hover:text-yellow-700 transition-colors"
                        title="Pause Account"
                      >
                        <Pause className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteAccount(user.user_id, e)}
                        className="p-1 text-red-600 hover:text-red-700 transition-colors"
                        title="Delete Account"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

*/
}
export default UsersPage;