import React, { useEffect, useState } from "react";
import { FiUser, FiMail, FiImage, FiLock } from "react-icons/fi";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const token = localStorage.getItem("token");

  // =========================
  // FETCH PROFILE
  // =========================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setProfile(data);
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchProfile();
    else setLoading(false);
  }, [token]);

  // =========================
  // UPDATE PROFILE
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", profile.name || "");
      formData.append("bio", profile.bio || "");

      if (profile.password) {
        formData.append("password", profile.password);
      }

      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      const res = await fetch(`${API_BASE}/api/auth/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // ❌ NO content-type
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Profile updated successfully ✅");
        setProfile(data.user || data);
      } else {
        setMessage(data.error || "Update failed ❌");
      }
    } catch (error) {
      console.error("Update error:", error);
      setMessage("Server error ❌");
    }
  };

  // =========================
  // UI STATES
  // =========================
  if (loading) return <div className="p-10 text-center">Loading profile...</div>;
  if (!profile) return <div className="p-10 text-center">Profile not found</div>;

  // =========================
  // JSX
  // =========================
  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <img
            src={
              profile.profileImage ||
              "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-md"
          />

          <h1 className="text-3xl font-bold text-gray-900 mt-4">My Profile</h1>

          <span className="mt-2 px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
            {profile.role || "User"}
          </span>
        </div>

        {message && (
          <div className="mb-6 text-center text-green-600 font-medium">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={profile.name || ""}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              value={profile.email || ""}
              readOnly
              className="w-full px-4 py-3 border rounded-lg bg-gray-100"
            />
          </div>

          {/* Profile Image Upload */}
          <div>
            <label className="block font-medium mb-1">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block font-medium mb-1">Bio</label>
            <textarea
              rows="3"
              value={profile.bio || ""}
              onChange={(e) =>
                setProfile({ ...profile, bio: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1">
              New Password (optional)
            </label>
            <input
              type="password"
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-xl"
          >
            Update Profile
          </button>
        </form>
      </div>
    </section>
  );
}
