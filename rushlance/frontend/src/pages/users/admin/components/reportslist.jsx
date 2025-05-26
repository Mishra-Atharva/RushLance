import { useState } from "react";

export default function ReportsList() {
  const [drafts, setDrafts] = useState([
  {
    id: 1,
    title: "Daily System Health",
    description: "Automated daily summary of system status and uptime.",
    updated: "2025-06-01 09:00"
  },
  {
    id: 2,
    title: "User-sign-ups (May)",
    description: "Monthly report of all new user registrations in May.",
    updated: "2025-06-01 08:10"
  },
  {
    id: 3,
    title: "Payment Gateway Errors",
    description: "Log of all payment gateway errors for the month.",
    updated: "2025-05-31 22:15"
  },
  {
    id: 4,
    title: "Pending Invoices",
    description: "List of all invoices pending for approval.",
    updated: "2025-05-30 17:25"
  },
  {
    id: 5,
    title: "Weekly Activity Summary",
    description: "Summary of all user activity for the week.",
    updated: "2025-05-29 15:00"
  },
  {
    id: 6,
    title: "Unresolved Tickets",
    description: "All support tickets currently unresolved.",
    updated: "2025-05-28 12:30"
  },
  {
    id: 7,
    title: "Monthly Bug Report",
    description: "Bugs reported by users in the last month.",
    updated: "2025-05-27 10:45"
  },
  {
    id: 8,
    title: "Feature Requests",
    description: "Open feature requests from users.",
    updated: "2025-05-26 09:20"
  }
]);

const [completed] = useState([
  {
    id: 9,
    title: "Q1 Revenue Summary",
    description: "Quarterly summary of revenue and growth.",
    updated: "2025-04-02 11:30"
  },
  {
    id: 10,
    title: "Annual Traffic Overview",
    description: "Overview of site traffic and user engagement for the year.",
    updated: "2025-01-15 14:05"
  },
  {
    id: 11,
    title: "Resolved Support Tickets",
    description: "Summary of all support tickets resolved in Q1.",
    updated: "2025-03-20 09:45"
  },
  {
    id: 12,
    title: "Monthly Expenses",
    description: "Detailed report of all monthly expenses.",
    updated: "2025-05-28 13:10"
  }
]);

  // Modal state
  const [modal, setModal] = useState({ open: false, report: null, mode: "view" });
  // New report form state
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // Edit form state
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  // Open view/edit modal
  const handleOpen = (report, mode) => {
    setModal({ open: true, report, mode });
    if (mode === "edit") {
      setEditTitle(report.title);
      setEditDesc(report.description);
    }
  };
  const handleClose = () => setModal({ open: false, report: null, mode: "view" });

  // Handle new report creation
  const handleCreateReport = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setDrafts([
      {
        id: Date.now(),
        title: newTitle,
        description: newDesc,
        updated: new Date().toISOString().slice(0, 16).replace("T", " ")
      },
      ...drafts
    ]);
    setNewTitle("");
    setNewDesc("");
    setShowNew(false);
  };

  // Handle editing and saving a draft report
  const handleSaveEdit = () => {
    setDrafts(drafts.map(r =>
      r.id === modal.report.id
        ? {
            ...r,
            title: editTitle,
            description: editDesc,
            updated: new Date().toISOString().slice(0, 16).replace("T", " ")
          }
        : r
    ));
    handleClose();
  };

  return (
    <section className="rounded-2xl border border-gray-200 p-8 flex flex-col gap-8 bg-white">
      {/* header */}
      <header className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold">Reports</h2>
        <button
          className="px-4 py-2 rounded-lg bg-gray-800 text-white text-sm hover:opacity-90"
          onClick={() => setShowNew(true)}
        >
          + New report
        </button>
      </header>

      {/* New Report Modal */}
      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <form
            onSubmit={handleCreateReport}
            className="bg-white rounded-xl shadow-lg p-8 min-w-[320px] relative"
          >
            <button
              type="button"
              onClick={() => setShowNew(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
              title="Close"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-4">Create New Report</h3>
            <label className="block mb-2 font-medium">Report Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              placeholder="e.g. Weekly Activity Summary"
              required
            />
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              value={newDesc}
              onChange={e => setNewDesc(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              placeholder="Describe this report"
              rows={3}
              required
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setShowNew(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DRAFTS */}
      <div className="flex flex-col gap-4">
        <h3 className="font-medium text-gray-700">Drafts</h3>
        <ReportTable rows={drafts} onAction={handleOpen} completed={false} />
      </div>

      {/* COMPLETED */}
      <div className="flex flex-col gap-4">
        <h3 className="font-medium text-gray-700">Completed</h3>
        <ReportTable rows={completed} onAction={handleOpen} completed />
      </div>

      {/* Modal for view/edit */}
      {modal.open && (
        <Modal
          onClose={handleClose}
          report={modal.report}
          mode={modal.mode}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          editDesc={editDesc}
          setEditDesc={setEditDesc}
          onSaveEdit={handleSaveEdit}
        />
      )}
    </section>
  );
}

function ReportTable({ rows = [], completed = false, onAction }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="border-b border-gray-200">
          <tr className="text-gray-500">
            <th className="py-2 pr-4">Title</th>
            <th className="py-2 pr-4">Description</th>
            <th className="py-2 pr-4">Last updated</th>
            <th className="py-2 pr-4 w-[1%] whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-b last:border-none">
              <td className="py-3 pr-4">{r.title}</td>
              <td className="py-3 pr-4 text-gray-600">{r.description}</td>
              <td className="py-3 pr-4 text-gray-500">{r.updated}</td>
              <td className="py-3">
                {completed ? (
                  <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                    onClick={() => onAction(r, "view")}
                  >
                    View
                  </button>
                ) : (
                  <button
                    className="px-3 py-1 rounded bg-gray-800 text-white hover:opacity-90"
                    onClick={() => onAction(r, "edit")}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Modal({
  onClose,
  report,
  mode,
  editTitle,
  setEditTitle,
  editDesc,
  setEditDesc,
  onSaveEdit
}) {
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
        <h3 className="text-lg font-semibold mb-4">
          {mode === "edit" ? "Edit Report" : "View Report"}
        </h3>
        {mode === "edit" ? (
          <form
            onSubmit={e => {
              e.preventDefault();
              onSaveEdit();
            }}
          >
            <label className="block mb-2 font-medium">Title</label>
            <input
              type="text"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              required
            />
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              value={editDesc}
              onChange={e => setEditDesc(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              rows={3}
              required
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="mb-2">
              <span className="font-medium">Title:</span> {report.title}
            </div>
            <div className="mb-2">
              <span className="font-medium">Description:</span> {report.description}
            </div>
            <div className="mb-4">
              <span className="font-medium">Last updated:</span> {report.updated}
            </div>
            <button
              onClick={onClose}
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
