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

  useEffect(() => {
    axios.get(`drive-fleet-server.onrender.com/car/${id}`)
      .then(res => setCar(res.data));
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

    try {
      const res = await axios.post("https://drive-fleet-server.onrender.com/bookings", bookingInfo, { withCredentials: true });
      if (res.data.insertedId) {
        toast.success("Car Booked Successfully!");
        setIsModalOpen(false);
        navigate("/my-bookings");
      }
    } catch (err) {
      toast.error("Booking failed. Please try again.");
    }
  };

  if (!car) return <div className="text-center py-20 font-bold">Loading Details...</div>;

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <img src={car.image} alt={car.name} className="w-full h-[400px] object-cover rounded-[2rem] shadow-2xl" />
        
        <div className="space-y-6 text-left">
          <h1 className="text-4xl font-black text-gray-900">{car.name}</h1>
          <p className="text-blue-600 font-bold bg-blue-50 w-fit px-4 py-1 rounded-full">{car.type}</p>
          <div className="flex items-center gap-2 text-gray-500 font-bold">
            <FaMapMarkerAlt className="text-blue-600" /> {car.location}
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-100 p-4 rounded-2xl text-center">
                <FaUserFriends className="mx-auto text-blue-600 mb-1" />
                <p className="text-xs text-gray-400 font-bold">Seats</p>
                <p className="font-bold">{car.capacity}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-2xl text-center">
                <FaCogs className="mx-auto text-blue-600 mb-1" />
                <p className="text-xs text-gray-400 font-bold">Type</p>
                <p className="font-bold">Auto</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-2xl text-center">
                <FaGasPump className="mx-auto text-blue-600 mb-1" />
                <p className="text-xs text-gray-400 font-bold">Status</p>
                <p className="font-bold">Ready</p>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">{car.description}</p>

          <div className="pt-6 border-t flex justify-between items-center">
            <div>
              <p className="text-2xl font-black text-blue-600">${car.dailyPrice}/day</p>
              <p className="text-xs text-gray-400 font-bold">Bookings: {car.booking_count || 0}</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all">Book Now</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-left">Confirm Your Booking</h2>
            <form onSubmit={handleBooking} className="space-y-4 text-left">
              <div>
                <label className="block font-bold mb-1">Driver Needed?</label>
                <select name="driver" className="w-full p-3 border rounded-xl">
                  <option value="No">No, I'll drive</option>
                  <option value="Yes">Yes, I need a driver</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-1">Special Note</label>
                <textarea name="note" rows="3" placeholder="Any special requests..." className="w-full p-3 border rounded-xl"></textarea>
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-200 py-3 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;