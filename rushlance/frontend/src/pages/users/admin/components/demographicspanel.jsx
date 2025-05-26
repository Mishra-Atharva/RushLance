// src/pages/users/admin/components/demographicspanel.jsx

export default function DemographicsPanel({ male, female, other }) {
  // Calculate total for percentages and to avoid division by zero
  const total = male + female + other || 1;

  // Calculate actual percentages
  const malePct = Math.round((male / total) * 100);
  const femalePct = Math.round((female / total) * 100);
  const otherPct = 100 - malePct - femalePct; // Ensures total is 100%

  return (
    <div className="col-span-full rounded-2xl border border-gray-200 p-6 shadow bg-white">
      <h2 className="text-lg font-semibold mb-5 text-gray-800 flex items-center gap-2">
        <span role="img" aria-label="demographics">👥</span>
        User Demographics
      </h2>
      <div className="space-y-4">
        <DemographicBar label="Male" percent={malePct} color="#60a5fa" />
        <DemographicBar label="Female" percent={femalePct} color="#f472b6" />
        <DemographicBar label="Other" percent={otherPct} color="#a3a3a3" />
      </div>
      <div className="mt-6 flex justify-between text-xs text-gray-500">
        <span>Total Users: <b>{total}</b></span>
        <span>
          Male: {male} | Female: {female} | Other: {other}
        </span>
      </div>
    </div>
  );
}

function DemographicBar({ label, percent, color }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="font-mono">{percent}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
        <div
          className="h-4 rounded"
          style={{
            width: `${percent}%`,
            background: color,
            transition: "width 0.6s cubic-bezier(.4,2.3,.3,1)",
          }}
        />
      </div>
    </div>
  );
}
