import {
  FaStar,
  FaBriefcase,
  FaWallet,
  FaProjectDiagram,
  FaUser,
  FaRegComments,
  FaCog
} from "react-icons/fa";

import {useState, useEffect} from "react";
import {dashboardDetails} from "../utils/dashboard.js";

export default function FreelancerHome({ profile ={}, setCurrentLink }) {
  const {
    fullName       = "Unnamed",
    avatar         = "https://placehold.co/96x96?text=?",
    jobsCompleted  = "—",
    avgRating      = "—"
  } = profile;

  const [details, setDetails] = useState({});

  
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await dashboardDetails();
        if (data) {
          try {
            const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
            setDetails(parsedData);
          } catch (parseError) {
            console.error("Error parsing user data:", parseError);
            setError("Failed to parse user data");
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    
    fetchUserData();
  }, []);
  
  const stats = [
    { icon: <FaBriefcase />,      label: "Jobs",      value: details.jobs },
    { icon: <FaWallet />,         label: "Earnings",  value: "$" + details.earnings    },
    { icon: <FaStar />,           label: "Rating",    value: details.rating    },
    { icon: <FaProjectDiagram />, label: "Active",    value: details.active            }
  ];
  
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow">
      {/* header */}
      <header className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
        <img
          src={avatar}
          alt={fullName}
          className="w-16 h-16 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-semibold mb-1">
            Welcome, {fullName}
          </h2>
          <p className="text-gray-500">
            Quick overview of your freelance activity.
          </p>
        </div>
      </header>

      {/* stats */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-gray-50 border rounded-lg p-4 flex flex-col items-center gap-1"
          >
            <div className="text-xl text-gray-600">{s.icon}</div>
            <div className="text-xl font-bold">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </section>

      {/* quick links */}
      <section className="flex flex-wrap gap-3 mb-8">
        <Quick to="Profile"   set={setCurrentLink} Icon={FaUser}           />
        <Quick to="Projects"  set={setCurrentLink} Icon={FaProjectDiagram} />
        <Quick to="Reviews"   set={setCurrentLink} Icon={FaRegComments}    />
        <Quick to="Settings"  set={setCurrentLink} Icon={FaCog}            />
      </section>
    </div>
  );
}

function Quick({ to, set, Icon }) {
  return (
    <button
      onClick={() => set(to)}
      className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-gray-100 transition text-sm"
    >
      <Icon className="text-gray-600" /> {to}
    </button>
  );
}
