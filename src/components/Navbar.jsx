

import { useContext, useState } from "react";


import { Link, NavLink } from "react-router-dom";


    import { AuthContext } from "../providers/AuthProvider";





const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false); 





  const activeLink = "text-blue-600 font-bold border-b-2 border-blue-600 pb-1";


  const normalLink = "text-gray-700 hover:text-blue-600 font-medium transition-all";




  const links = (
    <>
     
      <NavLink to="/" className={({ isActive }) => isActive ? activeLink : normalLink}>Home</NavLink>
     
      <NavLink to="/cars" className={({ isActive }) => isActive ? activeLink : normalLink}>Explore Cars</NavLink>
      {user && (
        <>
         
         
         
            <NavLink to="/add-car" className={({ isActive }) => isActive ? activeLink : normalLink}>Add Car</NavLink>
         
          <NavLink to="/my-bookings" className={({ isActive }) => isActive ? activeLink : normalLink}>My Bookings</NavLink>
         
         
         
          <NavLink to="/my-added-cars" className={({ isActive }) => isActive ? activeLink : normalLink}>My Added Cars</NavLink>
        </>
      )}
    </>
  );





  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
       
        <div className="flex justify-between h-20 items-center">
          
          



         
         
          <div className="flex-shrink-0 flex items-center">
            
            
           
            <Link to="/" className="text-2xl font-black tracking-tighter text-blue-700">
              DRIVE<span className="text-gray-900">FLEET</span>
          
          
          
            </Link>
        
        
        
        
          </div>

        
        
        
        
        
        
        
        
        
        
        
        
        
        
          
          <div className="hidden md:flex items-center space-x-8">
            {links}
          </div>

         





          <div className="flex items-center gap-4">
            {user ? (
              
              <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
               
               
               
                <div className="text-right hidden sm:block">
                
                
                
                
                  <p className="text-xs font-bold text-gray-900 leading-tight">{user?.displayName || "User"}</p>
               
               
                  <button onClick={() => logOut()} className="text-[10px] font-bold text-red-500 uppercase tracking-wider hover:underline">Logout</button>
              
              
              
                </div>
            
            
            
            
            
                <img 
                  src={user?.photoURL || "https://i.ibb.co/mJR9nkv/user.png"} 
                  alt="profile" 
                  className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover shadow-sm"
                />
            
            
            
              </div>
            ) : (
             
             
             
              <Link 
                to="/login" 
                className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                Login
              </Link>
            )}








            

            <div className="md:hidden">
              
              
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
               
               
               
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  
                  
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
               
               
               
               
                </svg>
            
            
            
              </button>
          
          
            </div>
         
         
         
          </div>
     
     
     
        </div>
    
    
    
    
      </div>

     





      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 flex flex-col gap-4 shadow-inner">
          {links}
       
        </div>
      )}
    </nav>
  );
};











export default Navbar;