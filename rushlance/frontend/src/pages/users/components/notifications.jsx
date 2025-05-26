import { useState, useEffect } from "react";
import { getNotifications } from "./utils/get_notification";

const getNotificationColor = (type) => {
  switch (type) {
    case "read":
      return "#e6e6e6";
    default:
      return "#cfcfcf";
  }
};

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotifications() {
      const data = await getNotifications();
      if (data) {
        setNotifications(JSON.parse(data));
        console.log(JSON.parse(data));
      }
    }

    fetchNotifications();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "700px",
        margin: "0 auto",
        padding: "40px 30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "26px",
          marginBottom: "30px",
          textAlign: "center",
        }}>
        Notifications
      </h1>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}>
        {notifications.map((note) => (
          <div
            key={note.id}
            style={{
              backgroundColor: getNotificationColor(note.type),
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px #aeafb1",
            }}>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "500",
                marginBottom: "8px",
                color: "#333",
              }}>
              {note.message}
            </div>
            <div style={{ fontSize: "13px", color: "#666" }}>{note.date}</div>
          </div>
        ))}
        {notifications.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: "#999",
              padding: "30px",
              background: "#fff",
              borderRadius: "8px",
            }}>
            No new notifications.
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;