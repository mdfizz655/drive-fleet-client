import { Link } from "react-router-dom";
import { FaCarSide, FaMapMarkerAlt, FaCogs } from "react-icons/fa";

const CarCard = ({ car }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl transition-all group">
      {/* Image Area */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={car.image} 
          alt={car.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {car.type}
        </div>
      </div>

      {/* Details Area */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{car.name}</h3>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-gray-500 text-sm gap-2">
            <FaMapMarkerAlt className="text-blue-500" />
            <span>{car.location}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm gap-2">
            <FaCogs className="text-blue-500" />
            <span>Automatic Transmission</span>
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-4">
          <div>
            <span className="text-2xl font-black text-blue-600">${car.dailyPrice}</span>
            <span className="text-gray-400 text-sm font-medium"> / day</span>
          </div>
          <Link 
            to={`/car/${car._id}`} 
            className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors shadow-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;