import { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../components/Banner";
import CarCard from "../components/CarCard";
import WhyChooseUs from "../components/WhyChooseUs";
import SpecialOffers from "../components/SpecialOffers";

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // ডাটাবেস থেকে সব গাড়ি আনা (সার্চ ছাড়া)
    axios.get("https://drive-fleet-server.onrender.com/cars")
      .then(res => {
        // রিকোয়ারমেন্ট অনুযায়ী শুধু প্রথম ৬টি গাড়ি দেখানো
        setCars(res.data.slice(0, 6));
      });
  }, []);

  return (
    <div className="pb-20">
      <Banner />
      
      <section className="py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">Available Fleet</h2>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map(car => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </section>

      <WhyChooseUs />
      <SpecialOffers />
    </div>
  );
};

export default Home;