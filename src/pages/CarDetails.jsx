import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";

const CarDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://drive-fleet-server.onrender.com";

  useEffect(() => {
    axios.get(`${API_URL}/car/${id}`).then(res => { setCar(res.data); setLoading(false); });
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access-token'); // টোকেন নাও
    
    const bookingInfo = {
      carId: car._id,
      carName: car.name,
      price: car.dailyPrice,
      image: car.image,
      userEmail: user?.email,
      bookingDate: new Date().toLocaleDateString(),
      driverNeeded: e.target.driver.value,
      specialNote: e.target.note.value,
      status: "Confirmed"
    };

    try {
      const res = await axios.post("https://drive-fleet-server.onrender.com/bookings", bookingInfo, {
        headers: { authorization: `Bearer ${token}` } // হেডার পাঠানো হচ্ছে 👈
      });
      if (res.data.insertedId) {
        toast.success("Car Booked Successfully!");
        setIsModalOpen(false);
        navigate("/my-bookings");
      }
    } catch (err) {
      toast.error("Error: Please login again.");
    }
};

  if (loading || !car) return <div className="text-center py-20 font-bold">Loading...</div>;

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
        <img src={car.image} className="w-full h-[400px] object-cover rounded-[2rem] shadow-2xl" alt="" />
        <div className="space-y-6">
          <h1 className="text-4xl font-black text-gray-900">{car.name}</h1>
          <p className="text-gray-500 font-bold">{car.location}</p>
          <p className="text-gray-600">{car.description}</p>
          <div className="pt-6 border-t flex justify-between items-center">
            <p className="text-3xl font-black text-blue-600">${car.dailyPrice}/day</p>
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black">Book Now</button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-black mb-6">Confirm Booking</h2>
            <form onSubmit={handleBooking} className="space-y-4">
              <select name="driver" className="w-full p-3 border rounded-xl"><option value="No">No Driver</option><option value="Yes">Need Driver</option></select>
              <textarea name="note" rows="3" placeholder="Special note..." className="w-full p-3 border rounded-xl"></textarea>
              <div className="flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 py-3 rounded-xl font-bold">Cancel</button>
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