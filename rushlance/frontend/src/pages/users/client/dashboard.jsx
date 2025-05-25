import { useState } from "react";
import NavigationBar from "../components/navigation.jsx";
import SideBar       from "../components/sidebar.jsx";
import Content       from "../components/content.jsx";
import Footer        from "../components/footer.jsx";

export default function DashboardClient() {
  const [link, setLink] = useState("Dashboard");

  const style = {
    width: "100vw",
    height: "100vh",
    fontFamily: "poppins",
    display: "grid",
    gridTemplateAreas: `"header header"
                        "menu   content"
                        "footer footer"`,
    gridTemplateRows: "70px 1fr 60px",
    gridTemplateColumns: "auto 1fr",
    backgroundColor: "#f2f2f2"
  };

  return (
    <div style={style}>
      <NavigationBar userType="client" />
      <SideBar   currentLink={{ link, setLink }} userType="client" />
      <Content   currentLink={{ link, setLink }} userType="client" />
    </div>
  );
}
