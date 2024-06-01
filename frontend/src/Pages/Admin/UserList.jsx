import React, { useEffect, useState } from "react";
import axios from "axios";
import AsideBar from "../../Components/Admin/AsideBar";
import Header from "../../Components/Admin/Header";
import { toast } from "react-toastify";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin_side/users/');
      setUsers(response.data.users);
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  const toggleUserActive = async (userId) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/admin_side/users/toggle-active/${userId}/`);
      toast.success(`User ${response.data.is_active ? 'unblocked' : 'blocked'} successfully`);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      toast.error("Error toggling user status");
    }
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <AsideBar />
        <section className="container m-4">
          <div className="flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-x-3">
                            <button className="flex items-center gap-x-2">
                              <span>Email</span>
                            </button>
                          </div>
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Name
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Mobile
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Active
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Date Joined
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-4 py-4 text-xs font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <span>{user.email}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {user.full_name}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {user.phone}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${user.is_active ? 'text-emerald-500 bg-emerald-100/60 dark:bg-gray-800' : 'text-red-500 bg-red-100/60 dark:bg-gray-800'}`}>
                              <h2 className="text-sm font-normal">{user.is_active ? 'Active' : 'Inactive'}</h2>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {new Date(user.date_joined).toLocaleDateString()}  {/* Parse and format the date */}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <button
                              className={`text-sm font-medium ${user.is_active ? 'text-red-500' : 'text-green-500'} hover:underline`}
                              onClick={() => toggleUserActive(user.id)}
                            >
                              {user.is_active ? 'Block' : 'Unblock'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6"></div>
        </section>
      </div>
    </div>
  );
}

export default UserList;
