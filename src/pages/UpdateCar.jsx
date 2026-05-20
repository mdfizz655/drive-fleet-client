import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const UpdateCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    axios.get(`https://drive-fleet-server-seven.vercel.app/car/${id}`)
      .then(res => setCar(res.data));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      name: form.name.value,
      dailyPrice: parseFloat(form.price.value),
      type: form.type.value,
      location: form.location.value,
      description: form.desc.value,
      image: form.image.value,
    };

    try {
      const res = await axios.put(`https://drive-fleet-server-seven.vercel.app/car/${id}`, updatedData, { withCredentials: true });
      if (res.data.modifiedCount > 0) {
        toast.success("Car updated successfully!");
        navigate("/my-added-cars");
      }
    } catch (err) {
      toast.error("Failed to update car.");
    }
  };

  if (!car) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="py-10 max-w-2xl mx-auto px-4">
      <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-gray-50">
        <h2 className="text-2xl font-black mb-6">Update Car: {car.name}</h2>
        <form onSubmit={handleUpdate} className="space-y-4 text-left">
          <div>
            <label className="block font-bold mb-1">Car Name</label>
            <input type="text" name="name" defaultValue={car.name} className="w-full p-3 border rounded-xl" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-1">Daily Price ($)</label>
              <input type="number" name="price" defaultValue={car.dailyPrice} className="w-full p-3 border rounded-xl" />
            </div>
            <div>
              <label className="block font-bold mb-1">Type</label>
              <select name="type" defaultValue={car.type} className="w-full p-3 border rounded-xl">
                <option>SUV</option><option>Sedan</option><option>Hatchback</option><option>Luxury</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-bold mb-1">Location</label>
            <input type="text" name="location" defaultValue={car.location} className="w-full p-3 border rounded-xl" />
          </div>
          <div>
            <label className="block font-bold mb-1">Image URL</label>
            <input type="text" name="image" defaultValue={car.image} className="w-full p-3 border rounded-xl" />
          </div>
          <div>
            <label className="block font-bold mb-1">Description</label>
            <textarea name="desc" defaultValue={car.description} rows="3" className="w-full p-3 border rounded-xl"></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg">Update Vehicle</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCar;