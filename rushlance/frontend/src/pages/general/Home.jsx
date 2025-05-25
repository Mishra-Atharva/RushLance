import NavigationBar from "../users/components/navigation";
import { useState, useEffect, useRef } from "react";
import services from "./utils/services.json";

const pastservices = [
  {
    id: 101,
    title: "Old Website Design",
    description: "Completed website design",
    price: 400,
    category: "Web Development",
    available: false,
  },
  {
    id: 102,
    title: "Old Logo Design",
    description: "Completed logo",
    price: 150,
    category: "Graphic Design",
    available: false,
  },
];

function Home() {
  const [groupedServices, setGroupedServices] = useState({});

  useEffect(() => {
    if (!services || !Array.isArray(services)) {
      console.error("services is not an array or is missing");
      return;
    }
    const grouped = services.reduce((acc, service) => {
      const cat = service.category || "Other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(service);
      return acc;
    }, {});
    setGroupedServices(grouped);
  }, []);

  const scrollContainers = useRef({});

  // Scroll function
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
                gap: "120px",
                overflowX: "auto",
                paddingBottom: "10px",
                scrollBehavior: "smooth",
              }}
            >
              {groupedServices[category].map((service) => (
                <div
                  key={service.id}
                  style={{
                    flex: "0 0 auto",
                    width: "250px",
                    background: "white",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    textAlign: "center",
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
              ))}
            </div>

            {/* Left hover area */}
            <div
              onMouseEnter={() => startScrolling(category, -1)}
              onMouseLeave={() => stopScrolling(category)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "40px",
                height: "100%",
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
                top: 0,
                right: 0,
                width: "40px",
                height: "100%",
                cursor: "e-resize",
                zIndex: 10,
              }}
            ></div>
          </section>
        ))}

        <h1 style={{ fontSize: "32px", marginBottom: "30px", textAlign: "center" }}>
          Past Services
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {pastservices.map((service) => (
            <div
              key={service.id}
              style={{
                flex: "0 0 250px",
                background: "#e0e0e0",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
                {service.title}
              </h3>
              <p style={{ color: "#555", marginBottom: "5px" }}>{service.description}</p>
              <p style={{ color: "#000", fontWeight: "bold" }}>Paid ${service.price}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;