import NavigationBar from "../users/components/navigation";
import { useState, useEffect, useRef } from "react";
import { serviceData } from "./utils/service_data.js";
import { Link } from "react-router-dom";

export default function Home() {
  const [grouped, setGrouped] = useState({});
  const rowRef = useRef({});
  const userType = (localStorage.getItem("type") || "").toLowerCase();
  const isClient = userType === "client";

  useEffect(() => {
    (async () => {
      const raw = await serviceData();
      const arr = Array.isArray(raw) ? raw : JSON.parse(raw || "[]");
      const g = arr.reduce((a, s) => {
        (a[s.category || "Other"] ||= []).push(s);
        return a;
      }, {});
      setGrouped(g);
    })();
  }, []);

  const scroll = (k, d) => {
    const el = rowRef.current[k];
    if (!el) return;
    clearInterval(el.t);
    el.t = setInterval(() => (el.scrollLeft += d * 6), 16);
  };
  const stop = k => rowRef.current[k] && clearInterval(rowRef.current[k].t);

  if (!Object.keys(grouped).length) return <div style={{ padding: 40 }}>Loading…</div>;

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", background: "#f5f5f5", minHeight: "100vh" }}>
      <NavigationBar userType={userType} showLocation={false} />

      <main style={{ width: "98%", margin: "0 auto", padding: "32px 0" }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, textAlign: "center", marginBottom: 48 }}>
          Featured Services by Category
        </h1>

        {Object.keys(grouped).map(cat => (
          <section key={cat} style={{ marginBottom: 64, position: "relative" }}>
            <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24, textAlign: "center" }}>{cat}</h2>

            <div
              ref={el => (rowRef.current[cat] = el)}
              style={{
                display: "flex",
                gap: 32,
                overflowX: "auto",
                padding: 4,
                scrollBehavior: "smooth",
                justifyContent: "center"
              }}
            >
              {grouped[cat].map(s => (
                <div
                  key={s.id}
                  style={{
                    width: 340,
                    background: "#fff",
                    borderRadius: 18,
                    padding: 28,
                    boxShadow: "0 4px 12px rgba(0,0,0,.08)",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    height: "100%",
                    position: "relative"
                  }}
                >
                  <img
                    src="https://placehold.co/340x200?text=Service"
                    alt={s.title}
                    style={{ width: "100%", borderRadius: 10, marginBottom: 18 }}
                  />
                  <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>{s.title}</h3>
                  <p style={{ color: "#555", fontSize: 15, marginBottom: 8, flexGrow: 1 }}>{s.description}</p>
                  <p style={{ fontWeight: 700, fontSize: 16 }}>From ${s.price}</p>
                  
                  {isClient ? (
                    <Link 
                      to={`/service/${s.id}`}
                      style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 1,
                        textDecoration: "none",
                        color: "inherit"
                      }}
                    />
                  ) : (
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "rgba(255,255,255,0.7)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 18,
                      zIndex: 2
                    }}>
                      <p style={{
                        backgroundColor: "#f5f5f5",
                        padding: "8px 16px",
                        borderRadius: 20,
                        fontWeight: 500,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                      }}>
                        {userType === "freelancer" ? "Your Service" : "Login as Client to Book"}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* hover zones */}
            <div
              onMouseEnter={() => scroll(cat, -1)}
              onMouseLeave={() => stop(cat)}
              style={{ position: "absolute", top: 0, left: 0, width: 60, height: "100%", cursor: "w-resize" }}
            />
            <div
              onMouseEnter={() => scroll(cat, 1)}
              onMouseLeave={() => stop(cat)}
              style={{ position: "absolute", top: 0, right: 0, width: 60, height: "100%", cursor: "e-resize" }}
            />
          </section>
        ))}
      </main>
    </div>
  );
}