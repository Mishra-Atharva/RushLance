import { useEffect, useState } from "react";
// import toastIcon from "../assets/toast-icon.png"; // Save your notification icon image here

function FloatingNotification() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000); // Auto-hide after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#fff",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        padding: "15px 20px",
        display: "flex",
        alignItems: "center",
        minWidth: "340px",
        maxWidth: "90%",
        zIndex: 9999,
      }}
    >
      <img
        src={toastIcon}
        alt="notification icon"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "12px",
          marginRight: "12px",
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: "bold", fontSize: "16px" }}>☕ Today Only!</div>
        <div style={{ fontSize: "14px", color: "#333" }}>
          Enjoy an exclusive deal on your favorite brew! Don’t miss out!
        </div>
      </div>
      <div style={{ fontSize: "12px", color: "#888", marginLeft: "12px" }}>now</div>
    </div>
  );
}

export default FloatingNotification;
