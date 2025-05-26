import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { serviceData, bookService } from "./utils/service_data.js";
import NavigationBar from "../users/components/navigation";

function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [showBookedMessage, setShowBookedMessage] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      const data = await serviceData();
      const parsed = typeof data === "string" ? JSON.parse(data) : data;
      const allServices = Array.isArray(parsed) ? parsed : [];
      const found = allServices.find((s) => String(s.id) === id);
      setService(found);
      if (found && found.status === "booked") setBooked(true);
    };
    fetchService();
  }, [id]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleBook = async () => {
    setIsBooking(true);
    
    const clientId = localStorage.getItem("id");
    const freelancerId = service.freelancer_id;

    await bookService(
      clientId,
      service.id,
      freelancerId,
      selectedDate
    );

    setBooked(true);
    setShowBookedMessage(true);
    setService({ ...service, status: "booked" });
    setIsBooking(false);
  };

  if (!service) {
    return (
      <div style={{ fontFamily: "Poppins, sans-serif", padding: "40px" }}>
        Loading service details...
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <NavigationBar />
      <main style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}>
            {service.title}
          </h1>
          <img
            src={service.image || "https://placehold.co/600x400?text=Service+Image"}
            alt={service.title}
            style={{
              width: "100%",
              borderRadius: "8px",
              marginBottom: "25px",
              maxHeight: "400px",
              objectFit: "cover",
            }}
          />
          <p style={{ fontSize: "18px", marginBottom: "15px" }}>
            <strong>Description:</strong> {service.description}
          </p>
          <p style={{ fontSize: "18px", marginBottom: "10px" }}>
            <strong>Category:</strong> {service.category}
          </p>
          <p style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>
            From ${service.price}
          </p>

          {!booked ? (
            <>
              <div style={{ margin: "20px 0" }}>
                <label 
                  htmlFor="service-date"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                    fontSize: "16px"
                  }}
                >
                  Select booking date:
                </label>
                <input
                  type="date"
                  id="service-date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split('T')[0]}
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    width: "100%",
                    maxWidth: "300px",
                    fontSize: "16px"
                  }}
                />
              </div>

              <button
                onClick={handleBook}
                disabled={isBooking || !selectedDate}
                style={{
                  marginTop: "15px",
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: "600",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: (isBooking || !selectedDate) ? "not-allowed" : "pointer",
                  opacity: (isBooking || !selectedDate) ? 0.7 : 1,
                }}
              >
                {isBooking ? "Booking..." : "Book Service"}
              </button>

              {showBookedMessage && (
                <p style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "green",
                  marginTop: "15px",
                  animation: "fadeIn 0.5s"
                }}>
                  Service has been booked successfully!
                </p>
              )}
            </>
          ) : (
            <div style={{ marginTop: "25px" }}>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "green",
                  marginBottom: "10px"
                }}
              >
                Service successfully booked!
              </p>
              <p style={{ fontSize: "15px" }}>
                <strong>Booking Date:</strong> {new Date(selectedDate).toLocaleDateString()}
              </p>
              <p style={{ fontSize: "15px", marginTop: "5px" }}>
                <strong>Status:</strong> Pending confirmation
              </p>
            </div>
          )}
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default ServiceDetails;