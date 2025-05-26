import { useState } from "react";

const seed = [
  { id: 301, name: "Jane Doe",       email: "jane@designs.com",   rating: 4.8, jobs: 27, status: "Active"   },
  { id: 302, name: "Tom Evans",      email: "tom@code.io",        rating: 4.2, jobs: 15, status: "Active"   },
  { id: 303, name: "Aisha Chen",     email: "aisha@dev.net",      rating: 4.9, jobs: 40, status: "Inactive" },
  { id: 304, name: "Carlos Garcia",  email: "carlos@apps.mx",     rating: 4.5, jobs: 22, status: "Active"   },
  { id: 305, name: "Priya Patel",    email: "priya@webs.in",      rating: 4.7, jobs: 31, status: "Active"   },
  { id: 306, name: "Liam Smith",     email: "liam@smiths.io",     rating: 4.3, jobs: 18, status: "Active"   },
  { id: 307, name: "Fatima Noor",    email: "fatima@noordesign.com", rating: 4.6, jobs: 25, status: "Active" },
  { id: 308, name: "Lucas Rossi",    email: "lucas@rossi.it",     rating: 4.1, jobs: 12, status: "Inactive" },
  { id: 309, name: "Mia Nguyen",     email: "mia@nguyen.vn",      rating: 4.9, jobs: 37, status: "Active"   }
];


export default function Freelancers() {
  const [rows] = useState(seed);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState({ open: false, freelancer: null });

  const filtered = rows.filter(r =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="rounded-2xl border border-gray-200 p-8 bg-white flex flex-col gap-8">
      <header className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold">Freelancers</h2>
        <input
          placeholder="Search freelancer…"
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
              <th className="py-2 pr-4">Rating</th>
              <th className="py-2 pr-4">Jobs</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4 w-[1%] whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(f => (
              <tr key={f.id} className="border-b last:border-none">
                <td className="py-3 pr-4">{f.id}</td>
                <td className="py-3 pr-4">{f.name}</td>
                <td className="py-3 pr-4 text-gray-500">{f.email}</td>
                <td className="py-3 pr-4">{f.rating}</td>
                <td className="py-3 pr-4">{f.jobs}</td>
                <td className="py-3 pr-4">{f.status}</td>
                <td className="py-3">
                  <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                    onClick={() => setModal({ open: true, freelancer: f })}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal.open && (
        <FreelancerModal
          freelancer={modal.freelancer}
          onClose={() => setModal({ open: false, freelancer: null })}
        />
      )}
    </section>
  );
}

function FreelancerModal({ freelancer, onClose }) {
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
        <h3 className="text-lg font-semibold mb-4">Freelancer Details</h3>
        <div className="mb-2"><b>ID:</b> {freelancer.id}</div>
        <div className="mb-2"><b>Name:</b> {freelancer.name}</div>
        <div className="mb-2"><b>Email:</b> {freelancer.email}</div>
        <div className="mb-2"><b>Rating:</b> {freelancer.rating}</div>
        <div className="mb-2"><b>Jobs:</b> {freelancer.jobs}</div>
        <div className="mb-2"><b>Status:</b> {freelancer.status}</div>
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
