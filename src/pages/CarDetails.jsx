import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaUserFriends, FaMapMarkerAlt, FaCogs, FaGasPump } from "react-icons/fa";

const CarDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // রেন্ডার সার্ভার লিঙ্ক
  const API_URL = "https://drive-fleet-server.onrender.com";

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_URL}/car/${id}`)
      .then(res => {
        setCar(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching car details:", err);
        setLoading(false);
      });
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
        toast.error("Please login to book this car!");
        return navigate("/login");
    }

    const form = e.target;
    const bookingInfo = {
      carId: car._id,
      carName: car.name,
      price: car.dailyPrice,
      image: car.image,
      userEmail: user?.email,
      userName: user?.displayName,
      driverNeeded: form.driver.value,
      specialNote: form.note.value,
      bookingDate: new Date().toLocaleDateString(),
      status: "Confirmed"
    };

    // লোকাল স্টোরেজ থেকে টোকেন নেওয়া
    const token = localStorage.getItem('access-token');

    try {
      const res = await axios.post(`${API_URL}/bookings`, bookingInfo, {
        headers: {
            authorization: `Bearer ${token}` // হেডার পাঠানো হচ্ছে 👈
        }
      });
      
      if (res.data.insertedId) {
        toast.success("Car Booked Successfully!");
        setIsModalOpen(false);
        navigate("/my-bookings");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unauthorized: Please login again.");
    }
  };

  if (loading) return <div className="text-center py-20 font-bold text-blue-600">Loading Details...</div>;
  if (!car) return <div className="text-center py-20 font-bold text-red-500">Car not found!</div>;

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Car Image */}
        <div className="relative group">
            <img 
                src={car.image} 
                alt={car.name} 
                className="w-full h-[400px] object-cover rounded-[2rem] shadow-2xl border border-gray-100" 
            />
            <div className="absolute top-6 right-6 bg-blue-600 text-white px-4 py-1 rounded-full font-bold text-sm shadow-lg">
                {car.type}
            </div>
        </div>
        
        {/* Car Info */}
        <div className="space-y-6 text-left">
          <h1 className="text-4xl font-black text-gray-900">{car.name}</h1>
          
          <div className="flex items-center gap-2 text-gray-500 font-bold">
            <FaMapMarkerAlt className="text-blue-600" /> {car.location}
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-2xl text-center border border-gray-100">
                <FaUserFriends className="mx-auto text-blue-600 mb-1 text-xl" />
                <p className="text-[10px] text-gray-400 font-bold uppercase">Seats</p>
                <p className="font-bold text-gray-800">{car.capacity}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl text-center border border-gray-100">
                <FaCogs className="mx-auto text-blue-600 mb-1 text-xl" />
                <p className="text-[10px] text-gray-400 font-bold uppercase">Type</p>
                <p className="font-bold text-gray-800">Auto</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl text-center border border-gray-100">
                <FaGasPump className="mx-auto text-blue-600 mb-1 text-xl" />
                <p className="text-[10px] text-gray-400 font-bold uppercase">Status</p>
                <p className="font-bold text-gray-800">{car.availability || "Ready"}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 text-lg">Description</h3>
            <p className="text-gray-600 leading-relaxed">{car.description}</p>
          </div>

          <div className="pt-6 border-t flex justify-between items-center">
            <div>
              <p className="text-3xl font-black text-blue-600">${car.dailyPrice}<span className="text-sm text-gray-400">/day</span></p>
              <p className="text-xs text-gray-400 font-bold">Bookings: {car.booking_count || 0}</p>
            </div>
            <button 
                onClick={() => setIsModalOpen(true)} 
                className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all transform active:scale-95"
            >
                Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl relative">
            <h2 className="text-2xl font-black mb-6 text-left text-gray-900">Confirm Booking</h2>
            <form onSubmit={handleBooking} className="space-y-4 text-left">
              <div>
                <label className="block font-bold text-sm text-gray-700 mb-1">Driver Needed?</label>
                <select name="driver" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500">
                  <option value="No">No, I'll drive myself</option>
                  <option value="Yes">Yes, I need a driver</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-sm text-gray-700 mb-1">Special Note</label>
                <textarea name="note" rows="3" placeholder="Any special requests..." className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500"></textarea>
              </div>
              <div className="flex gap-4 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;