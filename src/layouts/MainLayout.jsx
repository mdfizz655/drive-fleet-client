


import { Outlet } from "react-router-dom";


import Navbar from "../components/Navbar";


import Footer from "../components/Footer";





const MainLayout = () => {
  
  return (
    
    
    <div className="min-h-screen bg-white">
      
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8">
       
       
        <Outlet />
    
    
      </main>
     
      <Footer />
   
    </div>
  );
};



export default MainLayout;