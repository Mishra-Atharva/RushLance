import NavigationBar from "../users/components/navigation";
import SideBar from "../users/components/sidebar";

const notifications = [
  {
    id: 1,
    message: "You have Client 1's request on Monday, May 26, 2025.",
    date: "24/05/2025 02:30 PM",
    type: "unread",
  },
  {
    id: 2,
    message: "You have successfully completed Client 1's request.",
    date: "23/03/2025 03:15 PM",
    type: "read"
  }
];

const getNotificationColor = (type) => {
  switch (type) {
    case "read":
      return "#e6e6e6";
    default:
      return "#cfcfcf";
  }
};

function Notifications() {
  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}>

      <NavigationBar />

      <div style={{ display: "flex", flex: 1 }}>
        <SideBar />

        <main
          style={{
            flex: 1,
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
              maxWidth: "700px",
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
        </main>
      </div>
    </div>
  );
}

export default Notifications;
