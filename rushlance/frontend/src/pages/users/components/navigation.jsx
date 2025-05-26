/*  src/pages/users/components/navigation.jsx  */

import { useNavigate } from "react-router-dom";

function NavigationBar() {
  const navigate   = useNavigate();
  const linkStyle  = { cursor: "pointer", padding: 20 };

  /* session data */
  const userType = localStorage.getItem("userType"); // "client"|"freelancer"|"admin"
  const token    = localStorage.getItem("token");

  /* dashboard link by role */
  const dashPath =
    userType === "client"
      ? "/dashboard_client"
      : userType === "freelancer"
      ? "/dashboard_freelancer"
      : userType === "admin"
      ? "/dashboard_admin"
      : null;

  return (
    <nav
      style={{ gridArea: "header" }}
      className="w-full h-full flex items-center justify-between bg-gray-100 px-10"
    >
      {/* logo */}
      <h1 className="text-2xl font-bold">RushLance</h1>

      {/* central nav links */}
      <ul className="flex gap-6 font-medium">
        <li style={linkStyle} onClick={() => navigate("/")}>
          Home
        </li>

        {token && dashPath && (
          <li style={linkStyle} onClick={() => navigate(dashPath)}>
            Dashboard
          </li>
        )}

        {!token && (
          <li style={linkStyle} onClick={() => navigate("/signup")}>
            Signup&nbsp;/&nbsp;Login
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavigationBar;