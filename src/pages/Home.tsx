import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers, filterUsers } from "../redux/userSlice";
import type { AppDispatch, RootState } from "../redux/store";
import { Link } from "react-router";
import { toast } from "react-toastify";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.user);
  const usersFiltered = useSelector((state: RootState) =>
    filterUsers(state, query)
  );

  const handleDelete = (id: number) => () => {
    dispatch(deleteUser(id));
    toast.error("User berhasil dihapus", {
      theme: "colored",
    });
  };

  useEffect(() => {
    if (!users.data || users.data.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.data]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="p-4 lg:p-20">
      <div className="flex justify-between items-center mb-4">
        <Link to="/users/add">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer ">
            Tambah User
          </button>
        </Link>
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search by name or email"
          className="p-2 lg:p-3 lg:w-[25rem] border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 placeholder-gray-400"
        />
      </div>
      <div className="p-6 bg-white rounded-2xl shadow-md">
        <div className="rounded-lg w-full overflow-x-scroll border border-gray-200">
          <table className="w-full ">
            <thead>
              <tr>
                <th className="p-3 border-b text-left cursor-pointer">No.</th>
                <th className="p-3 border-b text-left cursor-pointer">ID</th>
                <th className="p-3 border-b text-left cursor-pointer">Nama</th>
                <th className="p-3 border-b text-left cursor-pointer">Email</th>
                <th className="p-3 border-b text-left cursor-pointer">
                  Perusahaan
                </th>
                <th className="p-3 border-b text-left cursor-pointer">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.isLoading && (
                <tr>
                  <td colSpan={6} className="p-3 text-center">
                    Loading...
                  </td>
                </tr>
              )}
              {usersFiltered?.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="p-3  text-sm lg:text-lg">{index + 1}</td>
                  <td className="p-3  text-sm lg:text-lg">{user.id}</td>
                  <td className="p-3  text-sm lg:text-lg">{user.name}</td>
                  <td className="p-3 text-sm lg:text-lg">{user.email}</td>
                  <td className="p-3  text-sm lg:text-lg">
                    {user.company.name}
                  </td>
                  <td className="p-3 flex gap-2">
                    <Link to={`/users/edit/${user.id}`}>
                      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 lg:py-2 lg:px-4 rounded cursor-pointer">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={handleDelete(user.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 lg:py-2 lg:px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
