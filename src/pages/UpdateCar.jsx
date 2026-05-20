import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const UpdateCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const API_URL = "https://drive-fleet-server.onrender.com";

  useEffect(() => {
    axios.get(`${API_URL}/cars/${id}`).then(res => setCar(res.data));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access-token');
    const updatedData = {
      name: e.target.name.value,
      dailyPrice: parseFloat(e.target.price.value),
      type: e.target.type.value,
      location: e.target.location.value,
      description: e.target.desc.value,
      image: e.target.image.value,
    };

    try {
      const res = await axios.put(`${API_URL}/cars/${id}`, updatedData, {
        headers: { authorization: `Bearer ${token}` }
      });
      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        toast.success("Car updated!");
        navigate("/my-added-cars");
      }
    } catch (err) {
      toast.error("Failed to update car.");
    }
  };

  if (!car) return <div className="text-center py-20 font-bold">Loading...</div>;

  return (
    <div className="py-10 max-w-2xl mx-auto px-4 text-left">
      <div className="bg-white p-8 rounded-[2rem] shadow-2xl border">
        <h2 className="text-2xl font-black mb-6">Update Car</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <input type="text" name="name" defaultValue={car.name} className="w-full p-3 border rounded-xl" />
          <input type="number" name="price" defaultValue={car.dailyPrice} className="w-full p-3 border rounded-xl" />
          <select name="type" defaultValue={car.type} className="w-full p-3 border rounded-xl"><option>SUV</option><option>Sedan</option><option>Luxury</option></select>
          <input type="text" name="location" defaultValue={car.location} className="w-full p-3 border rounded-xl" />
          <input type="text" name="image" defaultValue={car.image} className="w-full p-3 border rounded-xl" />
          <textarea name="desc" defaultValue={car.description} rows="3" className="w-full p-3 border rounded-xl"></textarea>
          <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold">Update Vehicle</button>
        </form>
      </div>
    </div>
  );
};
export default UpdateCar;