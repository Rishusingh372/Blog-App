import Creator from "../components/Creator";

const Creators = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">
            Meet Our <span className="text-blue-600">Creators</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Discover the people behind the stories and tutorials
          </p>
        </div>

        <Creator />
      </div>
    </div>
  );
};

export default Creators;
