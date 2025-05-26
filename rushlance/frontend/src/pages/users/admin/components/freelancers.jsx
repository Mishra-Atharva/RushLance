import { useEffect, useState } from "react";
import { getClients } from "../utils/client.js";

export default function Freelancer() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getClients();
      if (data) {
        // Filter only clients
        const parse_data = JSON.parse(data);
        const clientList = parse_data.filter(user => user.user_type === "freelancer");
        setClients(clientList);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-500">Loading clients...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Clients</h2>
      {clients.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Full Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Gender</th>
                <th className="border px-4 py-2">Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{client.id}</td>
                  <td className="border px-4 py-2">{client.full_name}</td>
                  <td className="border px-4 py-2">{client.email}</td>
                  <td className="border px-4 py-2">{client.phone}</td>
                  <td className="border px-4 py-2 capitalize">{client.gender}</td>
                  <td className="border px-4 py-2">
                    {new Date(client.date_of_birth).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No clients found.</p>
      )}
    </div>
  );
}