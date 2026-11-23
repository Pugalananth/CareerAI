import { useEffect, useState } from "react";
import axios from "axios";

function AdminUsers() {

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:5000/users"
      );

      setUsers(res.data);

    }

    catch (err) {

      console.log(err);

    }

  };

  // Filter users

  const filteredUsers = users.filter((user) =>

    user.name.toLowerCase().includes(search.toLowerCase()) ||

    user.email.toLowerCase().includes(search.toLowerCase())

  );

  return (

    <div className="min-h-screen gradient-bg pt-32 px-10 pb-10">

      {/* Title */}

      <h1 className="text-4xl font-bold gradient-text mb-10 text-center">

        Registered Users

      </h1>

      {/* Search Bar */}

      <div className="max-w-3xl mx-auto mb-8">

        <input

          type="text"

          placeholder="Search users by name or email..."

          value={search}

          onChange={(e) => setSearch(e.target.value)}

          className="w-full px-5 py-4 rounded-2xl bg-slate-800/60 border border-slate-700 text-white placeholder-slate-400 outline-none focus:border-cyan-400"

        />

      </div>

      {/* User List */}

      <div className="max-w-4xl mx-auto space-y-6">

        {filteredUsers.length === 0 ? (

          <div className="text-center text-white text-xl">

            No users found

          </div>

        ) : (

          filteredUsers.map((user, i) => (

            <div

              key={i}

              className="glass rounded-3xl p-6 flex justify-between items-center"

            >

              <div>

                <h2 className="text-2xl font-bold text-white">

                  {user.name}

                </h2>

                <p className="text-slate-300 mt-2">

                  {user.email}

                </p>

              </div>

              <div className="text-5xl">

                👤

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default AdminUsers;