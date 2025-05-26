import NavigationBar from "../components/navigation";
import SideBar from "../components/sidebar";
import Content from "../components/content";
import Footer from "../components/footer";
import { useState } from "react";

// Default profile object for freelancer dashboard fallback
function DashboardAdmin() {
    const [link, setLink] = useState("Dashboard");
    // If you ever need to render the freelancer dashboard, pass this as the profile prop
    // <FreelancerDashboard profile={defaultFreelancerProfile} ... />

    const style = {
        width: "100vw",
        height: "100vh",
        fontFamily: "poppins",
        display: "grid",
        gridTemplateAreas: `
            "header header"
            "menu content"
            "footer footer"
        `,
        gridTemplateRows: "10% 80% 10%",
        gridTemplateColumns: "1fr 5fr",
        backgroundColor: "#f2f2f2",
    };

    return (
        <div style={style}>
            <NavigationBar />
            <SideBar currentLink={{ link, setLink }} userType="admin" />
            <Content currentLink={{ link, setLink }} userType="admin" />
            <Footer />
        </div>
    );
}

export default DashboardAdmin;
