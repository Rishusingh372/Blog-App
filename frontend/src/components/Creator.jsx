import axios from "axios";
import { useEffect, useState } from "react";

const Creator = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/users/admins",
          { withCredentials: true }
        );
        setCreators(data?.admins || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <p className="text-gray-500 text-lg">Loading creators...</p>
      </div>
    );
  }

  if (!creators.length) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <p className="text-gray-500 text-lg">No creators found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {creators.map((creator) => (
        <div
          key={creator._id}
          className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 text-center"
        >
          <img
            src={creator?.photo?.url}
            alt={creator?.name}
            className="w-24 h-24 rounded-full mx-auto object-cover border"
          />

          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            {creator?.name}
          </h3>

          <p className="text-sm text-gray-500">{creator?.role}</p>

          {/* Optional: Hide personal email/phone from public UI */}
          <div className="mt-4 text-xs text-gray-500">
            <p className="truncate">{creator?.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Creator;
