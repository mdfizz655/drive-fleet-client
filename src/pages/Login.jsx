import { useContext } from "react";


import { Link, useNavigate } from "react-router-dom";


   import { toast } from "react-hot-toast";


import { FcGoogle } from "react-icons/fc";


  import { AuthContext } from "../providers/AuthProvider";





const Login = () => {
  const { signIn, googleLogin } = useContext(AuthContext);


  const navigate = useNavigate();





  


  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;



    const email = form.email.value;


    const password = form.password.value;









    signIn(email, password)
      .then((result) => {
        toast.success("Login Successful!");





        navigate("/"); 



      })
      .catch((err) => {
        toast.error("Invalid Email or Password!");




      });
  };







  

  const handleGoogleLogin = () => {
    
    googleLogin()
      .then(() => {
        
        toast.success("Login Successful with Google!");



        navigate("/");



      })
      .catch((err) => {
        toast.error(err.message);



      });
  };








  return (
   
   
   <div className="min-h-screen flex items-center justify-center py-10 px-4">
     
     
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
       
       
       
        <h2 className="text-3xl font-black text-center text-gray-900 mb-8">Welcome Back</h2>
        
      
      
      
      
        <form onSubmit={handleLogin} className="space-y-6">
         
         
         
          <div>
           
           
            <label className="text-sm font-bold text-gray-700 block mb-2 text-left">Email Address</label>
           
           
            <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none transition-all" placeholder="name@example.com" />
         
         
          </div>
         
         
         
          <div>
          
          
            <label className="text-sm font-bold text-gray-700 block mb-2 text-left">Password</label>
          
          
            <input type="password" name="password" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none transition-all" placeholder="••••••••" />
        
        
          </div>
          
        
        
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg">
            Sign In
        
        
          </button>
       
       
        </form>

       
       
        <div className="divider my-8 text-gray-400 text-sm">OR</div>

       
       
        <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all mb-8">
         
         
         
          <FcGoogle className="text-2xl" /> Sign in with Google
       
       
       
        </button>

       
       
       
       
        <p className="text-center text-gray-600 text-sm">
          New to DriveFleet? <Link to="/register" className="text-blue-600 font-bold hover:underline">Create an account</Link>
       
       
       
        </p>
    
    
      </div>
   
   
   
    </div>
  );
};






export default Login;