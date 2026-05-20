import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const API_URL = "https://drive-fleet-server.onrender.com";

  const handleAddCar = async (e) => {
    e.preventDefault();
    const form = e.target;
    const carData = {
      name: form.name.value,
      dailyPrice: parseFloat(form.price.value),
      type: form.type.value,
      image: form.image.value,
      capacity: parseInt(form.capacity.value),
      location: form.location.value,
      description: form.desc.value,
      availability: "Available",
      ownerEmail: user?.email,
      booking_count: 0
    };

    const token = localStorage.getItem('access-token');

    try {
      const res = await axios.post(`${API_URL}/cars`, carData, {
        headers: { authorization: `Bearer ${token}` }
      });
      if (res.data.insertedId) {
        toast.success("Car listed successfully!");
        navigate("/my-added-cars");
      }
    } catch (error) {
      toast.error("Failed to add car. Please login again.");
    }
  };

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 text-left">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-50">
            <h2 className="text-3xl font-black text-gray-900 mb-8">List a New Car</h2>
            <form onSubmit={handleAddCar} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" name="name" placeholder="Car Model" required className="p-3 border rounded-xl" />
                <input type="number" name="price" placeholder="Price Per Day" required className="p-3 border rounded-xl" />
                <select name="type" className="p-3 border rounded-xl"><option>SUV</option><option>Sedan</option><option>Hatchback</option><option>Luxury</option></select>
                <input type="number" name="capacity" placeholder="Seat Capacity" required className="p-3 border rounded-xl" />
                <input type="text" name="location" placeholder="Location" required className="p-3 border rounded-xl" />
                <input type="text" name="image" placeholder="Image URL" required className="p-3 border rounded-xl" />
                <textarea name="desc" placeholder="Description" rows="4" className="md:col-span-2 p-3 border rounded-xl"></textarea>
                <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700">List Your Car</button>
            </form>
        </div>
    </div>
  );
};
export default AddCar;