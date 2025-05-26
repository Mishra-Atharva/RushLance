/*  src/pages/users/components/sidebar.jsx  */

import { useState } from "react";
import { Navigate } from "react-router-dom";

/* ───── placeholder icon factory (grey square, text label) */
const icon = size => txt =>
  `https://placehold.co/${size}x${size}/dddddd/555555?text=${encodeURIComponent(
    txt
  )}`;

/* base 36-px icon for admin, 32-px for freelancer, 28-px for client */
const iconAdmin       = icon(36);
const iconFreelancer  = icon(32);
const iconClient      = icon(28);

const ICONS_ADMIN = {
  Dashboard:   iconAdmin("DB"),
  Reports:     iconAdmin("RP"),
  Chat:        iconAdmin("CH"),
  Clients:     iconAdmin("CL"),
  Freelancers: iconAdmin("FR"),
  Help:        iconAdmin("?"),
  Notifications: iconAdmin("NT"),
  SignOut:     iconAdmin("S")
};

const ICONS_FREELANCER = {
  Dashboard:  iconFreelancer("DB"),
  Profile:    iconFreelancer("PR"),
  Services:   iconFreelancer("SV"),
  Reviews:    iconFreelancer("RV"),
  Settings:   iconFreelancer("ST"),
  Help:       iconFreelancer("?"),
  Notifications: iconFreelancer("NT"),
  SignOut:    iconFreelancer("S")
};

const ICONS_CLIENT = {
  Dashboard:  iconClient("DB"),
  Account:    iconClient("AC"),
  Payment:    iconClient("$"),
  Bookings:   iconClient("BK"),
  Settings:   iconClient("ST"),
  Chat:       iconClient("CH"),
  Help:       iconClient("?"),
  Notifications: iconClient("NT"),
  SignOut:    iconClient("S")
};

function SideBar({ currentLink, userType = "client" }) {
  const [redirect, setRedirect] = useState(false);
  if (redirect) {
    localStorage.clear();
    return <Navigate to="/" replace />;
  }

  /* link sets */
  const clientLinks = [
    "Dashboard", "Account", "Payment", "Bookings",
    "Settings","Chat", "Help", "Notifications", "SignOut"
  ];
  const freelancerLinks = [
    "Dashboard", "Profile", "Services",
    "Reviews", "Settings", "Help", "Notifications", "SignOut"
  ];
  const adminLinks = [
    "Dashboard", "Reports", "Chat",
    "Clients", "Freelancers",
    "Help", "Notifications", "SignOut"
  ];

  /* helpers */
  const label = k =>
    k === "SignOut" ? "Sign out" : k.replace(/([A-Z])/g, " $1").trim();

  const links =
    userType === "admin"
      ? adminLinks
      : userType === "freelancer"
      ? freelancerLinks
      : clientLinks;

  const ICONS =
    userType === "admin"
      ? ICONS_ADMIN
      : userType === "freelancer"
      ? ICONS_FREELANCER
      : ICONS_CLIENT;

  /* sizing */
  const sideWidth = userType === "admin"
    ? "w-[270px]"
    : userType === "freelancer"
    ? "w-[240px]"
    : "w-[220px]";

  const btnPad   = userType === "admin" ? "py-4 px-6" : "py-3 px-5";
  const fontSize = userType === "admin" ? "text-[17px]" : "text-[15px]";
  const iconSize = userType === "admin" ? 36 : userType === "freelancer" ? 32 : 28;
  const baseBtn  = "flex items-center gap-4 rounded-lg transition-colors";

  return (
    <aside
      style={{
        gridArea: "menu",
        boxShadow: "rgba(0,0,0,0.08) 0 2px 4px, rgba(0,0,0,0.04) 0 1px 2px"
      }}
      className={`m-3 rounded-2xl bg-white flex flex-col gap-7 text-black ${sideWidth} select-none`}
    >
      <h1 className="font-semibold text-xl px-7 pt-7">Main Menu</h1>

      <nav className="flex-1 px-3 pb-8 space-y-2 overflow-y-auto">
        {links.map(k => {
          const active = currentLink.link === k;
          return (
            <button
              key={k}
              onClick={() =>
                k === "SignOut" ? setRedirect(true) : currentLink.setLink(k)
              }
              className={`${baseBtn} ${btnPad} ${fontSize} ${
                active ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              <img
                src={ICONS[k] || iconClient("·")}
                alt=""
                style={{ width: iconSize, height: iconSize }}
                className="rounded-md"
              />
              <span className="flex-1 text-left">{label(k)}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default SideBar;
