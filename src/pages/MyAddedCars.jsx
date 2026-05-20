import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyAddedCars = () => {
  const { user } = useContext(AuthContext);
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = "https://drive-fleet-server.onrender.com";

  useEffect(() => {
    if (user?.email) {
      const token = localStorage.getItem('access-token');
      axios.get(`${API_URL}/my-cars/${user.email}`, { headers: { authorization: `Bearer ${token}` } })
        .then(res => { setMyCars(res.data); setLoading(false); });
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({ title: "Are you sure?", text: "Delete this car?", icon: "warning", showCancelButton: true, confirmButtonText: "Delete" }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('access-token');
        axios.delete(`${API_URL}/cars/${id}`, { headers: { authorization: `Bearer ${token}` } })
          .then(res => { if (res.data.deletedCount > 0) { toast.success("Deleted!"); setMyCars(myCars.filter(car => car._id !== id)); } });
      }
    });
  };

  if (loading) return <div className="text-center py-20 font-bold">Loading...</div>;

  return (
    <div className="py-10 px-4">
      <h2 className="text-3xl font-black mb-8 text-left text-gray-900">My Listed Cars</h2>
      <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border">
        <table className="w-full text-left">
          <thead className="bg-gray-100 font-bold">
            <tr><th className="p-4">Image</th><th className="p-4">Name</th><th className="p-4 text-center">Actions</th></tr>
          </thead>
          <tbody>
            {myCars.map((car) => (
              <tr key={car._id} className="border-b">
                <td className="p-4"><img src={car.image} className="w-16 h-12 object-cover rounded" /></td>
                <td className="p-4 font-bold">{car.name}</td>
                <td className="p-4 flex justify-center gap-3">
                  <Link to={`/update-car/${car._id}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xs"><FaEdit /> EDIT</Link>
                  <button onClick={() => handleDelete(car._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-xs"><FaTrashAlt /> DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default MyAddedCars;