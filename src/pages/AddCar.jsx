import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddCar = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    // সব ডাটা অবজেক্ট হিসেবে নেওয়া
    const carData = {
      name: form.name.value,
      dailyPrice: parseFloat(form.price.value),
      type: form.type.value,
      image: form.image.value,
      capacity: parseInt(form.capacity.value),
      location: form.location.value,
      description: form.desc.value,
      availability: "Available", // ডিফল্ট স্ট্যাটাস
      ownerEmail: user?.email, // ইউজারের ইমেইল (খুবই জরুরি)
      ownerName: user?.displayName
    };

    try {
      // সার্ভারে ডাটা পাঠানো (With JWT Cookie)
      const response = await axios.post("https://drive-fleet-server.onrender.com/cars", carData, { withCredentials: true });
      
      if (response.data.insertedId) {
        toast.success("Car listed successfully!");
        form.reset();
        navigate("/my-added-cars"); // সাকসেস হলে লিস্ট পেজে নিয়ে যাবে
      }
    } catch (error) {
      toast.error("Failed to add car. Please login again.");
    }
  };

  return (
    <div className="py-10 max-w-4xl mx-auto px-4">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-50">
        <h2 className="text-3xl font-black text-gray-900 mb-2">List a New Car</h2>
        <p className="text-gray-500 mb-8">Fill in the details below to list your vehicle for rent.</p>
        
        <form onSubmit={handleAddCar} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1 text-left">
            <label className="font-bold text-gray-700 text-sm">Car Model Name</label>
            <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none transition-all" placeholder="e.g. Tesla Model 3" />
          </div>
          <div className="space-y-1 text-left">
            <label className="font-bold text-gray-700 text-sm">Daily Rental Price ($)</label>
            <input type="number" name="price" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none transition-all" placeholder="120" />
          </div>
          <div className="space-y-1 text-left">
            <label className="font-bold text-gray-700 text-sm">Car Type</label>
            <select name="type" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none appearance-none bg-white">
              <option>SUV</option>
              <option>Sedan</option>
              <option>Hatchback</option>
              <option>Luxury</option>
            </select>
          </div>
          <div className="space-y-1 text-left">
            <label className="font-bold text-gray-700 text-sm">Seat Capacity</label>
            <input type="number" name="capacity" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none transition-all" placeholder="5" />
          </div>
          <div className="space-y-1 text-left">
            <label className="font-bold text-gray-700 text-sm">Pickup Location</label>
            <input type="text" name="location" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none transition-all" placeholder="City, Country" />
          </div>
          <div className="space-y-1 text-left">
            <label className="font-bold text-gray-700 text-sm">Image URL</label>
            <input type="text" name="image" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none transition-all" placeholder="https://image-link.com" />
          </div>
          <div className="md:col-span-2 space-y-1 text-left">
            <label className="font-bold text-gray-700 text-sm">Description</label>
            <textarea name="desc" rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none transition-all" placeholder="Share features, rules, and condition of the car..."></textarea>
          </div>
          
          <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all mt-4 transform active:scale-95">
            List Your Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;