/*  src/pages/users/components/content.jsx  */

import { useState } from "react";

/* ─── shared */
import History from "../components/history.jsx";
import Notifications from "../components/notifications.jsx";

/* ─── CLIENT components */
import ClientHome      from "../client/components/home.jsx";
import PaymentMethod   from "../client/components/payment.jsx";
import ClientSettings  from "../client/components/settings.jsx";
import ClientHelp      from "../client/components/help.jsx";
import ClientChat      from "../client/components/chat.jsx";
import AccountDetails  from "../client/components/account_details.jsx";

/* ─── FREELANCER components */
import FreelancerProfile   from "../freelancer/components/profile.jsx";
import FreelancerServices  from "../freelancer/components/services.jsx";
import FreelancerReviews   from "../freelancer/components/reviews.jsx";
import FreelancerSettings  from "../freelancer/components/settings.jsx";
import FreelancerHome      from "../freelancer/components/home.jsx";
import FreelancerChat from "../freelancer/components/chat.jsx";

/* ─── ADMIN widgets */
import StatCard            from "../admin/components/statcard.jsx";
import DemographicsPanel   from "../admin/components/demographicspanel.jsx";
import ReportsList         from "../admin/components/reportslist.jsx";
import Chat                from "../admin/components/chat.jsx";
import Clients             from "../admin/components/clients.jsx";
import Freelancers         from "../admin/components/freelancers.jsx";
import AdminHelp           from "../admin/components/help.jsx";

// Notification data for each user type
const clientNotifications = [
  {
    id: 1,
    message: "Your payment was successful.",
    date: "25/05/2025 10:30 AM",
    type: "unread",
  },
  {
    id: 2,
    message: "You have a new message from Freelancer John.",
    date: "24/05/2025 04:15 PM",
    type: "read",
  }
];

const freelancerNotifications = [
  {
    id: 1,
    message: "You have a new job request from Client Alice.",
    date: "25/05/2025 09:00 AM",
    type: "unread",
  },
  {
    id: 2,
    message: "Client Bob left you a 5-star review!",
    date: "23/05/2025 02:45 PM",
    type: "read",
  }
];

const adminNotifications = [
  {
    id: 1,
    message: "System maintenance scheduled for May 30.",
    date: "24/05/2025 08:00 PM",
    type: "unread",
  },
  {
    id: 2,
    message: "New user registration: Client Carol.",
    date: "23/05/2025 11:00 AM",
    type: "read",
  }
];

function Content({ currentLink, userType = "client" }) {
  const areaStyle = { gridArea: "content" };

  /* ─────────── CLIENT  */
  if (userType === "client") {
    return (
      <div style={areaStyle} className="rounded-2xl m-2 p-6 bg-white">
        {currentLink.link === "Dashboard" && <ClientHome />}
        {currentLink.link === "Account"   && <AccountDetails />}
        {currentLink.link === "Payment"   && <PaymentMethod />}
        {currentLink.link === "Bookings"  && <History />}
        {currentLink.link === "Chat"      && <ClientChat />}
        {currentLink.link === "Settings"  && <ClientSettings />}
        {currentLink.link === "Help"      && <ClientHelp />}
        {currentLink.link === "Notifications" && (
          <Notifications notifications={clientNotifications} />
        )}
      </div>
    );
  }

  /* ─────────── FREELANCER  */
  const [profile, setProfile] = useState({
    fullName: "Jane Doe",
    email:    "jane@example.com",
    avatar:   "https://placehold.co/96x96?text=JD",
    bio:      "Full-stack developer with a love for clean code.",
    skills:   ["JavaScript", "React", "Node.js"],
    jobsCompleted: 27,
    avgRating:     4.8,
    yearsExp:      5
  });

  if (userType === "freelancer") {
    return (
      <div style={areaStyle} className="rounded-2xl m-2 p-6 bg-white">
        {currentLink.link === "Dashboard" && (
          <FreelancerHome
            profile={profile}
            setCurrentLink={currentLink.setLink}
          />
        )}
        {currentLink.link === "Profile"  && (
          <FreelancerProfile profile={profile} setProfile={setProfile} />
        )}
        {currentLink.link === "Services" && <FreelancerServices />}
        {currentLink.link === "Reviews"  && <FreelancerReviews />}
        {currentLink.link === "Settings" && (
          <FreelancerSettings profile={profile} setProfile={setProfile} />
        )}
        {currentLink.link === "Chat" && <FreelancerChat />}
        {currentLink.link === "Notifications" && (
          <Notifications notifications={freelancerNotifications} />
        )}
      </div>
    );
  }

  /* ─────────── ADMIN  */
  if (userType === "admin") {
    return (
      <div style={areaStyle} className="rounded-2xl m-2 p-6 grid gap-6 bg-white">
        {currentLink.link === "Dashboard" && (
          <div className="grid md:grid-cols-3 gap-6">
            <DemographicsPanel male={1629} female={1480} other={100} />
          </div>
        )}

        {currentLink.link === "Reports"      && <ReportsList />}
        {currentLink.link === "Chat"         && <Chat />}
        {currentLink.link === "Clients"      && <Clients />}
        {currentLink.link === "Freelancers"  && <Freelancers />}
        {currentLink.link === "Help"         && <AdminHelp />}
        {currentLink.link === "Notifications" && (
          <Notifications notifications={adminNotifications} />
        )}
      </div>
    );
  }

  /* ─────────── FALLBACK  */
  return (
    <div style={areaStyle} className="rounded-2xl m-2 p-6 bg-white">
      <h1>Page Not Found</h1>
    </div>
  );
}

export default Content;
