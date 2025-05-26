import { useState, useEffect } from "react";
import { FaStar, FaBriefcase, FaCheckCircle } from "react-icons/fa";
import { profileData } from "../utils/profile.js";

function FreelancerProfile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({
    bio: "",
    skills: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await profileData();
        if (data) {
          const parsedData = typeof data === "string" ? JSON.parse(data) : data;
          setProfile(parsedData);
          setEditProfile({
            bio: parsedData.bio || "",
            skills: (parsedData.skills && parsedData.skills.join(", ")) || "",
          });
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, []);

  if (!profile) {
    return <div className="p-6 text-gray-500">Loading profile...</div>;
  }

  // Helper to render stars
  const renderStars = (rating) => (
    <>
      {[...Array(5)].map((_, i) =>
        i < Math.round(rating) ? (
          <FaStar key={i} className="text-yellow-400 inline" />
        ) : (
          <FaStar key={i} className="text-gray-200 inline" />
        )
      )}
    </>
  );

  // Handle edit field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes (local only; replace with backend PUT/PATCH to persist)
  const handleSave = (e) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      bio: editProfile.bio,
      skills: editProfile.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    }));
    setIsEditing(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditProfile({
      bio: profile.bio || "",
      skills: (profile.skills && profile.skills.join(", ")) || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
        <img
          src={profile.avatar}
          alt={profile.fullName}
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
        />
        <div>
          <h2 className="text-2xl font-bold">{profile.fullName}</h2>
          <div className="mt-2 text-sm text-gray-400">{profile.email}</div>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="self-start sm:self-center bg-blue-600 text-white font-semibold px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-6 mb-6">
        <div className="flex items-center gap-2">
          <FaBriefcase className="text-blue-500" />
          <span className="font-semibold">{profile.jobsCompleted}</span>
          <span className="text-gray-500">Jobs Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-400" />
          <span className="font-semibold">{profile.avgRating}</span>
          <span className="text-gray-500">Avg. Rating</span>
        </div>
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-green-500" />
          <span className="font-semibold">{profile.yearsExp}</span>
          <span className="text-gray-500">Years Experience</span>
        </div>
      </div>

      {/* Editable Section */}
      {isEditing ? (
        <form onSubmit={handleSave} className="mb-6">
          <div className="mb-4">
            <label className="block font-semibold mb-1">Bio</label>
            <textarea
              name="bio"
              value={editProfile.bio}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">
              Skills (comma separated)
            </label>
            <input
              name="skills"
              value={editProfile.skills}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-5 py-2 rounded hover:bg-blue-700 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-800 font-semibold px-5 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          {/* Bio */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Bio</h3>
            <div className="text-gray-700">{profile.bio}</div>
          </div>
          {/* Skills */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills &&
                profile.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </div>
        </>
      )}

      {/* Top Review */}
      {profile.topReview && (
        <div className="mb-2">
          <h3 className="font-semibold mb-2">Top Review</h3>
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">{profile.topReview.client}</span>
              <span className="text-yellow-400 text-lg">
                {renderStars(profile.topReview.rating)}
              </span>
            </div>
            <div className="text-gray-700">{profile.topReview.text}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FreelancerProfile;