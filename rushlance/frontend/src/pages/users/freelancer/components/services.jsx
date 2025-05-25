import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { serviceData } from "../utils/service";

function FreelancerServices() {
  // Example state for list of services
  // const [services, setServices] = useState([
  //   {
  //     id: 1,
  //     title: "Web Design",
  //     description: "Modern responsive websites tailored for your business.",
  //     image: "https://placehold.co/64x64?text=Web"
  //   },
  //   {
  //     id: 2,
  //     title: "Logo Creation",
  //     description: "Unique, memorable logos that define your brand.",
  //     image: "https://placehold.co/64x64?text=Logo"
  //   }
  // ]);

  const [services, setServices] = useState([]);

  const [newService, setNewService] = useState({ title: "", description: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editService, setEditService] = useState({ title: "", description: "" });

  // Handle input changes
  const handleChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  // Add new service
  const handleAddService = (e) => {
    e.preventDefault();
    if (newService.title.trim() === "") return;
    setServices([
      ...services,
      {
        id: Date.now(),
        title: newService.title,
        description: newService.description,
        image: `https://placehold.co/64x64?text=${encodeURIComponent(newService.title)}`
      }
    ]);
    setNewService({ title: "", description: "" });
    setIsAdding(false);
  };

  // Remove service
  const handleRemove = (id) => {
    setServices(services.filter((s) => s.id !== id));
  };

  // Start editing
  const handleEdit = (service) => {
    setEditId(service.id);
    setEditService({ title: service.title, description: service.description });
  };

  // Save edit
  const handleSaveEdit = (e) => {
    e.preventDefault();
    setServices(services.map(s =>
      s.id === editId
        ? {
            ...s,
            ...editService,
            image: `https://placehold.co/64x64?text=${encodeURIComponent(editService.title)}`
          }
        : s
    ));
    setEditId(null);
    setEditService({ title: "", description: "" });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditId(null);
    setEditService({ title: "", description: "" });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await serviceData();
        if (data) {
          try {
            const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
            setServices(parsedData);
          } catch (parseError) {
            console.error("Error parsing user data:", parseError);
            setError("Failed to parse user data");
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  console.log(services);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Services</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            <FaPlus /> Add Service
          </button>
        )}
      </div>

      {/* Add new service form */}
      {isAdding && (
        <form onSubmit={handleAddService} className="mb-6 bg-gray-50 p-4 rounded-lg shadow-inner">
          <div className="mb-2">
            <label className="block font-medium mb-1" htmlFor="title">Service Title</label>
            <input
              name="title"
              type="text"
              value={newService.title}
              onChange={(e) => handleChange(e, setNewService)}
              placeholder="e.g. UI/UX Design"
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium mb-1" htmlFor="description">Description</label>
            <textarea
              name="description"
              value={newService.description}
              onChange={(e) => handleChange(e, setNewService)}
              placeholder="Describe your service"
              rows={2}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* List of services */}
      {services.length === 0 ? (
        <p className="text-gray-500">You have not added any services yet.</p>
      ) : (
        <ul className="space-y-4">
          {services.map((service) => (
            <li
              key={service.id}
              className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 hover:shadow transition"
            >
              {editId === service.id ? (
                <form onSubmit={handleSaveEdit} className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                  <img
                    src={`https://placehold.co/64x64?text=${encodeURIComponent(editService.title || "Service")}`}
                    alt="Service"
                    className="w-16 h-16 rounded object-cover mr-4"
                  />
                  <input
                    name="title"
                    type="text"
                    value={editService.title}
                    onChange={(e) => handleChange(e, setEditService)}
                    className="border border-gray-300 rounded px-2 py-1 w-full sm:w-1/4"
                    required
                  />
                  <textarea
                    name="description"
                    value={editService.description}
                    onChange={(e) => handleChange(e, setEditService)}
                    className="border border-gray-300 rounded px-2 py-1 w-full sm:w-2/4"
                    rows={1}
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={`https://placehold.co/64x64?text=${encodeURIComponent(service.title || "Service")}`}
                      alt="Service"
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <div className="font-semibold text-lg">{service.title}</div>
                      <div className="text-gray-600">{service.description}</div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-3 sm:mt-0">
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleRemove(service.id)}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1"
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FreelancerServices;
