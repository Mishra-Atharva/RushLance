import { useState } from "react";

// --- Modal component for viewing client details ---
function ClientModal({ client, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 min-w-[320px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
          title="Close"
        >
          ×
        </button>
        <h3 className="text-lg font-semibold mb-4">Client Details</h3>
        <div className="mb-2"><b>ID:</b> {client.id}</div>
        <div className="mb-2"><b>Name:</b> {client.name}</div>
        <div className="mb-2"><b>Email:</b> {client.email}</div>
        <div className="mb-2"><b>Projects:</b> {client.projects}</div>
        <div className="mb-2"><b>Status:</b> {client.status}</div>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// --- Main Clients component ---
const seed = [
  { id: 201, name: "Acme Corp",      email: "contact@acme.com",      projects: 5, status: "Active"   },
  { id: 202, name: "Globex Ltd",     email: "hello@globex.io",       projects: 2, status: "Active"   },
  { id: 203, name: "John Smith",     email: "john.smith@gmail.com",  projects: 1, status: "Inactive" },
  { id: 204, name: "Jane Johnson",   email: "jane@example.com",      projects: 3, status: "Active"   },
  { id: 205, name: "Wayne Enterprises", email: "wayne@enterprises.com", projects: 6, status: "Active" },
  { id: 206, name: "Stark Industries",  email: "tony@stark.com",        projects: 4, status: "Active" },
  { id: 207, name: "Oscorp",            email: "harry@oscorp.com",      projects: 2, status: "Inactive" },
  { id: 208, name: "LexCorp",           email: "lex@lexcorp.com",       projects: 5, status: "Active" },
  { id: 209, name: "Pied Piper",        email: "richard@piedpiper.com", projects: 3, status: "Active" },
  { id: 210, name: "Hooli",             email: "gavin@hooli.com",       projects: 2, status: "Active" },
  { id: 211, name: "Initech",           email: "peter@initech.com",     projects: 1, status: "Inactive" },
  { id: 212, name: "Umbrella Corp",     email: "alice@umbrella.com",    projects: 4, status: "Active" },
  { id: 213, name: "Soylent Corp",      email: "soylent@corp.com",      projects: 2, status: "Active" },
  { id: 214, name: "Cyberdyne Systems", email: "skynet@cyberdyne.com",  projects: 3, status: "Inactive" },
  { id: 215, name: "Wonka Industries",  email: "willy@wonka.com",       projects: 5, status: "Active" },
  { id: 216, name: "Duff Beer",         email: "homer@duff.com",        projects: 1, status: "Active" },
  { id: 217, name: "Vandelay Industries", email: "art@vandelay.com",    projects: 2, status: "Active" }
];


export default function Clients() {
  const [rows] = useState(seed);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState({ open: false, client: null });

  const filtered = rows.filter(r =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="rounded-2xl border border-gray-200 p-8 bg-white flex flex-col gap-8">
      <header className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold">Clients</h2>
        <input
          placeholder="Search client…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
        />
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="border-b border-gray-200 text-gray-500">
            <tr>
              <th className="py-2 pr-4">ID</th>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">E-mail</th>
              <th className="py-2 pr-4">Projects</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4 w-[1%] whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-b last:border-none">
                <td className="py-3 pr-4">{c.id}</td>
                <td className="py-3 pr-4">{c.name}</td>
                <td className="py-3 pr-4 text-gray-500">{c.email}</td>
                <td className="py-3 pr-4">{c.projects}</td>
                <td className="py-3 pr-4">{c.status}</td>
                <td className="py-3">
                  <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                    onClick={() => setModal({ open: true, client: c })}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for viewing client details */}
      {modal.open && (
        <ClientModal
          client={modal.client}
          onClose={() => setModal({ open: false, client: null })}
        />
      )}
    </section>
  );
}
