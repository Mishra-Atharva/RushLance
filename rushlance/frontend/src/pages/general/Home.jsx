import NavigationBar from "../users/components/navigation";
import { useState, useEffect, useRef } from "react";
import { serviceData } from "./utils/service_data.js";
import { Link } from "react-router-dom";

function Home() {
  const [services, setServices] = useState([]);
  const [groupedServices, setGroupedServices] = useState({});
  const scrollContainers = useRef({});

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const data = await serviceData();
        if (data) {
          const parsedData = typeof data === "string" ? JSON.parse(data) : data;
          const cleanData = Array.isArray(parsedData) ? parsedData : [];
          
          console.log("Fetched services:", cleanData.map(s => ({
            id: s.id,
            title: s.title,
            freelancer_id: s.freelancer_id 
          })));

          setServices(cleanData);

          const grouped = cleanData.reduce((acc, service) => {
            const cat = service.category || "Other";
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(service);
            return acc;
          }, {});

          setGroupedServices(grouped);
        }
      } catch (err) {
        console.error("Error fetching or processing service data:", err);
        setServices([]);
        setGroupedServices({});
      }
    };

    fetchServiceData();
  }, []);

  const startScrolling = (category, direction) => {
    const container = scrollContainers.current[category];
    if (!container) return;

    let scrollAmount = 0;
    const speed = 5; 
    const intervalTime = 20; 

    if (container.scrollInterval) clearInterval(container.scrollInterval);

    container.scrollInterval = setInterval(() => {
      container.scrollLeft += direction * speed;
      scrollAmount += speed;
    }, intervalTime);
  };

  const stopScrolling = (category) => {
    const container = scrollContainers.current[category];
    if (container && container.scrollInterval) {
      clearInterval(container.scrollInterval);
      container.scrollInterval = null;
    }
  };

  if (Object.keys(groupedServices).length === 0) {
    return <div>Loading services...</div>;
  }

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <NavigationBar />
      <main style={{ padding: "40px" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "30px", textAlign: "center" }}>
          Featured Services by Category
        </h1>

        {Object.keys(groupedServices).map((category) => (
          <section key={category} style={{ marginBottom: "50px", position: "relative" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "15px" }}>
              {category}
            </h2>

            <div
              ref={(el) => (scrollContainers.current[category] = el)}
              style={{
                display: "flex",
                gap: "20px",
                overflowX: "auto",
                paddingBottom: "10px",
                scrollBehavior: "smooth",
              }}
            >
              {groupedServices[category].map((service) => (
                <Link
                  to={{
                    pathname: `/service/${service.id}`,
                    state: { freelancerId: service.freelancer_id }
                  }}
                  key={service.id}
                  style={{ textDecoration: "none", color: "inherit", minWidth: "250px" }}
                >
                  <div
                    style={{
                      background: "white",
                      borderRadius: "12px",
                      padding: "20px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      textAlign: "center",
                      height: "100%",
                    }}
                  >
                    <img
                      src="https://placehold.co/300x200?text=Service"
                      alt={service.title}
                      style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }}
                    />
                    <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
                      {service.title}
                    </h3>
                    <p style={{ color: "#555", marginBottom: "5px" }}>{service.description}</p>
                    <p style={{ color: "#000", fontWeight: "bold" }}>From ${service.price}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Left hover area */}
            <div
              onMouseEnter={() => startScrolling(category, -1)}
              onMouseLeave={() => stopScrolling(category)}
              style={{
                position: "absolute",
                top: "40px",
                left: 0,
                width: "40px",
                height: "calc(100% - 40px)",
                cursor: "w-resize",
                zIndex: 10,
              }}
            ></div>

            {/* Right hover area */}
            <div
              onMouseEnter={() => startScrolling(category, 1)}
              onMouseLeave={() => stopScrolling(category)}
              style={{
                position: "absolute",
                top: "40px",
                right: 0,
                width: "40px",
                height: "calc(100% - 40px)",
                cursor: "e-resize",
                zIndex: 10,
              }}
            ></div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default Home;