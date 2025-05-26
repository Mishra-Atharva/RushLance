import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { serviceData, createService, deleteService } from "../utils/service";

function FreelancerServices() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    is_active: true,
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editService, setEditService] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    is_active: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e, setter) => {
    const { name, value, type, checked } = e.target;
    setter((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    if (newService.title.trim() === "") return;
    
    setIsLoading(true);
    setError(null);
    try {
      const created = await createService(
        localStorage.getItem("id"),
        newService.category,
        newService.title,
        newService.description,
        parseFloat(newService.price),
        newService.is_active
      );
      
      if (created) {
        setSuccess("Service added successfully!");
        setIsAdding(false);
        setNewService({
          title: "",
          description: "",
          category: "",
          price: "",
          is_active: true,
        });
        
        // Refresh services list
        const refreshedData = await serviceData();
        const parsed = typeof refreshedData === "string" 
          ? JSON.parse(refreshedData) 
          : refreshedData;
        setServices(parsed);
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError("Failed to create service");
      }
    } catch (error) {
      console.error("Failed to add service:", error);
      setError("Failed to create service. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {

        setServices(prev => prev.filter(s => s.id !== id));

        deleteService(id);
    }
};

  const handleEdit = (service) => {
    setEditId(service.id);
    setEditService({ ...service });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditService({
      title: "",
      description: "",
      category: "",
      price: "",
      is_active: true,
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const data = await serviceData();
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        setServices(parsed);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Services</h2>
        {!isAdding && !editId && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            disabled={isLoading}
          >
            <FaPlus /> Add Service
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      {isAdding && (
        <form onSubmit={handleAddService} className="mb-6 bg-gray-50 p-4 rounded-lg shadow-inner">
          <div className="mb-2">
            <label className="block font-medium mb-1">Service Title</label>
            <input
              name="title"
              type="text"
              value={newService.title}
              onChange={(e) => handleChange(e, setNewService)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium mb-1">Category</label>
            <input
              name="category"
              type="text"
              value={newService.category}
              onChange={(e) => handleChange(e, setNewService)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium mb-1">Price ($)</label>
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={newService.price}
              onChange={(e) => handleChange(e, setNewService)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={newService.description}
              onChange={(e) => handleChange(e, setNewService)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              disabled={isLoading}
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium mb-1">
              <input
                name="is_active"
                type="checkbox"
                checked={newService.is_active}
                onChange={(e) => handleChange(e, setNewService)}
                disabled={isLoading}
              />{" "}
              Active
            </label>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add"}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setNewService({
                  title: "",
                  description: "",
                  category: "",
                  price: "",
                  is_active: true,
                });
              }}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {services.length === 0 && !isAdding ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">You have not added any services yet.</p>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mx-auto"
          >
            <FaPlus /> Add Your First Service
          </button>
        </div>
      ) : (
        <ul className="space-y-4">
          {services.map((service) => (
            <li
              key={service.id}
              className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 hover:shadow transition"
            >
              {editId === service.id ? (
                <form
                  onSubmit={handleSaveEdit}
                  className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2"
                >
                  <input
                    name="title"
                    type="text"
                    value={editService.title}
                    onChange={(e) => handleChange(e, setEditService)}
                    className="border px-2 py-1 rounded w-full sm:w-1/4"
                    required
                  />
                  <input
                    name="category"
                    type="text"
                    value={editService.category}
                    onChange={(e) => handleChange(e, setEditService)}
                    className="border px-2 py-1 rounded w-full sm:w-1/4"
                    required
                  />
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={editService.price}
                    onChange={(e) => handleChange(e, setEditService)}
                    className="border px-2 py-1 rounded w-full sm:w-1/6"
                    required
                  />
                  <textarea
                    name="description"
                    value={editService.description}
                    onChange={(e) => handleChange(e, setEditService)}
                    className="border px-2 py-1 rounded w-full sm:w-2/4"
                    rows={1}
                  />
                  <label className="flex items-center">
                    <input
                      name="is_active"
                      type="checkbox"
                      checked={editService.is_active}
                      onChange={(e) => handleChange(e, setEditService)}
                    />
                    <span className="ml-1">Active</span>
                  </label>
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
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
                    <div>
                      <div className="font-semibold text-lg">{service.title}</div>
                      <div className="text-gray-600">{service.description}</div>
                      <div className="text-gray-500 text-sm">Category: {service.category}</div>
                      <div className="text-gray-500 text-sm">Price: ${service.price}</div>
                      <div className="text-gray-500 text-sm">
                        Status: {service.is_active ? (
                          <span className="text-green-600">Active</span>
                        ) : (
                          <span className="text-red-600">Inactive</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-3 sm:mt-0">
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      disabled={isLoading}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleRemove(service.id)}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1"
                      disabled={isLoading}
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