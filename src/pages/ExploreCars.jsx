import { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "../components/CarCard";
import { FaSearch, FaFilter } from "react-icons/fa";

const ExploreCars = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // ডাটাবেস থেকে ডাটা আনা (সার্চ এবং ফিল্টার কুয়েরি সহ)
    axios.get(`https://drive-fleet-server-seven.vercel.app/cars?search=${searchTerm}&filter=${filterType}`)
      .then(res => {
        setCars(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [searchTerm, filterType]);

  return (
    <div className="py-10 min-h-screen">
      {/* Search & Filter Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by car name..." 
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 outline-none focus:border-blue-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <FaFilter className="text-blue-600" />
          {["All", "SUV", "Sedan", "Luxury"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${
                filterType === type ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid View */}
      {loading ? (
        <div className="text-center py-20"><span className="loading loading-spinner loading-lg text-blue-600"></span></div>
      ) : cars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars.map(car => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-2xl font-bold text-gray-400">No cars found!</h3>
        </div>
      )}
    </div>
  );
};

export default ExploreCars;