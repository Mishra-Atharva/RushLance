import {useState, useEffect} from "react";
import {countData} from "../utils/bookingcount.js"

//  client “Dashboard”
export default function ClientHome({ profile = {} }) {

  const [count, setCount] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await countData();
        if (data) {
          try {
            const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
            console.log(parsedData);
            setCount(parsedData);
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

  console.log(count);

  const { fullName = "Client", email = "email@example.com" } = profile;

  return (
    <section className="rounded-2xl border border-gray-200 p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">Welcome back, {localStorage.getItem("user_name")}!</h2>
      <p className="text-gray-600 mb-6">{localStorage.getItem("email")}</p>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card label="Total Bookings" value={count.total_bookings} />
        <Card label="Pending"        value={count.pending_bookings} />
        <Card label="Completed"      value={count.completed_bookings} />
      </div>
    </section>
  );
}

function Card({ label, value }) {
  return (
    <div className="flex flex-col items-center gap-1 border rounded-lg p-4 bg-gray-50">
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}
