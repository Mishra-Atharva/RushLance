/*  src/pages/users/components/account_details.jsx  */
/* simple client account card */
import { profileData } from "../../freelancer/utils/profile.js";

import { useState, useEffect } from "react";

export default function AccountDetails() {
  const [details, setDetails] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await profileData();
        if (data) {
          try {
            const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
            console.log(parsedData);
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

  return (
    <section className="rounded-2xl border border-gray-200 p-6 bg-white flex gap-6 items-center max-w-[460px]">
      <img
        src="https://placehold.co/96x96?text=👤"
        alt=""
        className="w-16 h-16 rounded-full object-cover border"
      />

      <div className="text-sm">
        <p className="font-medium">{details.full_name}</p>
        <p className="text-gray-600">{details.email}</p>
        <p className="text-gray-600">{details.phone}</p>
      </div>
    </section>
  );
}
