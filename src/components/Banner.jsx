import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative w-full h-[450px] md:h-[550px] flex items-center justify-center bg-gray-900 rounded-[2rem] overflow-hidden my-8 shadow-2xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920" 
          alt="Luxury Car" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
          Drive Your Dream <span className="text-blue-500">Journey</span> Today
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Affordable, reliable, and luxury cars at your fingertips. Rent the best vehicles for your next trip with DriveFleet.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/cars" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20"
          >
            Explore Cars
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;