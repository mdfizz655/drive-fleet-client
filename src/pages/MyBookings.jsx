import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios.get(`https://drive-fleet-server.onrender.com/my-bookings/${user.email}`, { withCredentials: true })
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
          <div key={booking._id} className="bg-white p-6 rounded-[2rem] shadow-lg border border-gray-100 flex flex-col justify-between">
            <div className="flex gap-4 items-center mb-4">
                <img src={booking.image} className="w-20 h-16 object-cover rounded-xl" alt="" />
                <div>
                    <h3 className="text-lg font-bold text-gray-800">{booking.carName}</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase">{booking.bookingDate}</p>
                </div>
            </div>
            <div className="space-y-2 mb-4 text-left">
                <p className="text-sm"><strong>Driver:</strong> {booking.driverNeeded}</p>
                <p className="text-sm text-gray-500 italic">"{booking.specialNote || 'No special note'}"</p>
            </div>
            <div className="flex justify-between items-center border-t pt-4">
              <span className="text-2xl font-black text-blue-600">${booking.price}</span>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      {bookings.length === 0 && <p className="text-center text-gray-400 py-20 italic">No bookings found!</p>}
    </div>
  );
};

export default MyBookings;