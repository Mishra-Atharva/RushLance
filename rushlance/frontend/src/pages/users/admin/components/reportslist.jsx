import { useEffect, useState } from "react";

export default function ReportsList() {
  const [signupCounts, setSignupCounts] = useState({});
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/users") // Adjust if needed
      .then(res => res.json())
      .then(users => {
        // Group users by signup date (YYYY-MM-DD)
        const counts = {};
        users.forEach(u => {
          const date = u.created_at.slice(0, 10); // "YYYY-MM-DD"
          counts[date] = (counts[date] || 0) + 1;
        });
        // Sort dates
        const sortedDates = Object.keys(counts).sort();
        setDates(sortedDates);
        setSignupCounts(counts);
        setLoading(false);
      });
  }, []);

  // For graph scaling
  const maxCount = Math.max(1, ...Object.values(signupCounts));

  return (
    <section className="rounded-2xl border border-gray-200 p-8 flex flex-col gap-8 bg-white">
      <h2 className="text-xl font-semibold mb-6">User Signups Per Day</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ maxWidth: 600 }}>
          <div className="flex flex-col gap-2">
            {dates.map(date => (
              <div key={date} className="flex items-center gap-2">
                <div style={{ width: 90, fontSize: 12 }}>{date}</div>
                <div
                  style={{
                    height: 24,
                    width: `${(signupCounts[date] / maxCount) * 300}px`,
                    background: "#2563eb",
                    borderRadius: 4,
                    transition: "width 0.3s"
                  }}
                  title={`${signupCounts[date]} signups`}
                />
                <span style={{ fontSize: 14, minWidth: 24 }}>{signupCounts[date]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
