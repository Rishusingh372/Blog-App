import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Creators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/users/admins",
          {
            withCredentials: true,
          }
        );
        setCreators(data?.admins || []);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load creators");
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-600 font-semibold">Loading creators...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Popular Creators
          </h1>
          <p className="text-gray-600 mt-2">
            Meet the creators who publish quality blogs on our platform.
          </p>
        </div>

        {/* Creators Grid */}
        {creators.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {creators.map((creator) => (
              <div
                key={creator._id}
                className="bg-white border rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
              >
                {/* Cover */}
                <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

                {/* Avatar */}
                <div className="-mt-12 flex justify-center">
                  <img
                    src={creator?.photo?.url || "/default-avatar.png"}
                    alt={creator?.name}
                    className="w-24 h-24 rounded-full border-4 border-white object-cover shadow"
                  />
                </div>

                {/* Info */}
                <div className="p-5 text-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {creator?.name}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {creator?.email}
                  </p>

                  <span className="inline-block mt-3 px-4 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                    {creator?.role}
                  </span>

                  {creator?.education && (
                    <p className="text-xs text-gray-500 mt-3">
                      Education: {creator.education}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 font-semibold">
            No creators found.
          </div>
        )}
      </div>
    </div>
  );
}

export default Creators;
