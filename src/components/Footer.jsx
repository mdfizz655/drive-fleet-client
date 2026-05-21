

import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";


import { FaXTwitter } from "react-icons/fa6";






const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20 w-full">
      
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
       
       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          

        
        
        
          <div className="space-y-4">
          
          
            <h2 className="text-white text-2xl font-bold tracking-tighter">
              DRIVE<span className="text-blue-500">FLEET</span>
            </h2>
           
           
           
           
            <p className="text-sm leading-relaxed">
              Experience the joy of driving your dream car. Reliable, fast, and affordable rentals.
            </p>
           
           
            <div className="text-sm">
              
              
              <p>Email: support@drivefleet.com</p>
             
             
              <p>Phone: +1 (555) 000-1234</p>
           
           
            </div>
         
         
          </div>

          
          



          <div>
          
            <h3 className="text-white text-lg font-semibold mb-6">Quick Links</h3>
           
           
            <ul className="space-y-3 text-sm">
              
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
             
             
              <li><a href="#" className="hover:text-blue-400 transition-colors">Available Cars</a></li>
            
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms & Conditions</a></li>
             
             
              <li><a href="#" className="hover:text-blue-400 transition-colors">Support Center</a></li>
           
           
            </ul>
        
        
          </div>

          





          <div>
           
           
           
            <h3 className="text-white text-lg font-semibold mb-6">Connect With Us</h3>
           
           
            <div className="flex gap-5 text-2xl">
             
             
             
              <a href="#" className="hover:text-white transition-all"><FaXTwitter /></a>
             
              <a href="#" className="hover:text-blue-500 transition-all"><FaFacebook /></a>
             
              <a href="#" className="hover:text-pink-500 transition-all"><FaInstagram /></a>
             
              <a href="#" className="hover:text-gray-400 transition-all"><FaGithub /></a>
          
          
            </div>
        
        
          </div>
      
      
      
        </div>

      
      
      
      
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
         
         
          <p>© {new Date().getFullYear()} DriveFleet Car Rental Platform. All rights reserved.</p>
        
        
        </div>
     
     
      </div>
    
    
    </footer>
  );
};














export default Footer;