import { useEffect, useState } from 'react';
import { getDashboard } from "../utils/dashboard";

export default function DemographicsPanel() {
  const [demographics, setDemographics] = useState({
    male: 0,
    female: 0,
    other: 0,
    total: 0,
    freelancers: 0,
    clients: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await getDashboard();
        console.log(data);
        
        if (data) {
          const parse_data = JSON.parse(data);
          const other = parse_data.total_users - parse_data.total_male_users - parse_data.total_female_users;
          
          setDemographics({
            male: parse_data.total_male_users,
            female: parse_data.total_female_users,
            other,
            total: parse_data.total_users,
            freelancers: parse_data.total_freelancers,
            clients: parse_data.total_clients
          });
        } else {
          throw new Error('No data received');
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load demographic data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Calculate percentages
  const total = demographics.total || 1; // Avoid division by zero
  const malePct = Math.round((demographics.male / total) * 100);
  const femalePct = Math.round((demographics.female / total) * 100);
  const otherPct = 100 - malePct - femalePct;

  if (loading) {
    return (
      <div className="col-span-full rounded-2xl border border-gray-200 p-6 shadow bg-white">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-full rounded-2xl border border-gray-200 p-6 shadow bg-white">
        <div className="text-red-500 text-center py-4">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

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
      
      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-400 mr-2"></span>
            <span>Total Users: <b>{demographics.total}</b></span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-purple-400 mr-2"></span>
            <span>Freelancers: <b>{demographics.freelancers}</b></span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-green-400 mr-2"></span>
            <span>Clients: <b>{demographics.clients}</b></span>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-gray-600">
            <span>Male: <b>{demographics.male}</b></span>
          </div>
          <div className="text-gray-600">
            <span>Female: <b>{demographics.female}</b></span>
          </div>
          <div className="text-gray-600">
            <span>Other: <b>{demographics.other}</b></span>
          </div>
        </div>
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
            transition: "width 0.6s ease-out",
          }}
        />
      </div>
    </div>
  );
}