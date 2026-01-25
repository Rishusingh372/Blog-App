import React from "react";
import { useAuth } from "../context/AuthProvider";

function MyProfile() {
  const { profile } = useAuth();
  const user = profile?.user;

  return (
    <div className="grid md:grid-cols-12 gap-6">
      <div className="md:col-span-4">
        <div className="bg-gray-50 border rounded-2xl p-6 text-center">
          <img
            src={user?.photo?.url || "/default-avatar.png"}
            alt="avatar"
            className="w-28 h-28 rounded-full mx-auto object-cover border"
          />
          <h2 className="mt-4 text-xl font-bold text-gray-900">
            {user?.name || "User"}
          </h2>
          <p className="text-sm text-gray-500">{user?.role}</p>
        </div>
      </div>

      <div className="md:col-span-8">
        <div className="bg-white border rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Profile Details
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gray-50 border">
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-semibold text-gray-900">{user?.email}</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border">
              <p className="text-xs text-gray-500">Phone</p>
              <p className="font-semibold text-gray-900">{user?.phone}</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border">
              <p className="text-xs text-gray-500">Role</p>
              <p className="font-semibold text-gray-900">{user?.role}</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border">
              <p className="text-xs text-gray-500">Education</p>
              <p className="font-semibold text-gray-900">
                {user?.education || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
