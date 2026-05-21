
import { FaShieldAlt, FaHeadset, FaWallet } from "react-icons/fa";



const WhyChooseUs = () => {
  const features = [
    
    { icon: <FaShieldAlt />, title: "Fully Insured", desc: "Every rental includes comprehensive insurance for your peace of mind." },
   
    { icon: <FaWallet />, title: "Best Price Guarantee", desc: "Find a lower price? We will match it plus give you an extra discount." },
    
    
    { icon: <FaHeadset />, title: "24/7 Roadside Support", desc: "Our dedicated team is always ready to help you anywhere, anytime." }
  ];







  return (
    
    
    <section className="py-20 bg-blue-50 rounded-[3rem] px-8 my-20 text-center">
      
      
      <div className="mb-12">
       
       
       
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Why Choose DriveFleet?</h2>
      
      
      
        <p className="text-gray-600 max-w-xl mx-auto">We provide the best car rental experience with premium vehicles and top-notch security.</p>
     
     
     
      </div>
     
     
     
     
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map((f, i) => (
         
         
         <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:translate-y-[-10px] transition-all">
           
           
           
            <div className="text-4xl text-blue-600 mb-4 flex justify-center">{f.icon}</div>
          
          
          
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
           
           
            <p className="text-gray-500 text-sm">{f.desc}</p>
         
         
         
         
          </div>
        ))}
      </div>
    </section>
  );
};





export default WhyChooseUs; 