import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = "https://drive-fleet-server.onrender.com";

  useEffect(() => {
    if (user?.email) {
      const token = localStorage.getItem('access-token');
      axios.get(`${API_URL}/my-bookings/${user.email}`, {
        headers: { authorization: `Bearer ${token}` } // হেডার যোগ করা হয়েছে
      })
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) return <div className="text-center py-20 font-bold text-blue-600">Loading Bookings...</div>;

  return (
    <div className="py-10 px-4">
      <h2 className="text-3xl font-black mb-8 text-left">My Bookings ({bookings.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div key={booking._id} className="bg-white p-6 rounded-[2rem] shadow-lg border border-gray-100 flex flex-col text-left">
            <img src={booking.image} className="w-full h-40 object-cover rounded-xl mb-4" alt="" />
            <h3 className="text-lg font-bold">{booking.carName}</h3>
            <p className="text-sm text-gray-400">Date: {booking.bookingDate}</p>
            <p className="text-sm text-blue-600 font-bold mt-2">Price: ${booking.price}</p>
            <span className="mt-2 bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold w-fit">{booking.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyBookings;