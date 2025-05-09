import logo from '../assets/newscover.gif'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useContext, useState } from 'react';
import context from '../context/contextProvider';  // adjust the path if needed
import { UserLogin } from '../context/userContext/userAction'; // adjust the path

function Login() {
  const { dispatch } = useContext(context);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

  const handleGoogleLogin = () => {
    toast.info('Please use email id and password for the moment', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }
  
    try {
      const result = await UserLogin(dispatch, email, password);
  
      if (result) {
        toast.success('Login successful!');
        navigate('/');
      }
    } catch (error) {
      // Show error toast if backend throws error
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error('Login failed. Please try again.');
      }
    }
  };
  

  return (
    <div className="bg-[#242424] min-h-screen">
      <div className="flex flex-wrap">
        <div className="flex w-full flex-col md:w-1/2">
          <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-between pt-8 md:justify-start md:px-6 md:pt-4">
            <p className="text-left text-3xl font-bold text-[#E0E0E0]">Welcome to NEWSteller 📰</p>
            <p className="mt-2 text-left text-[#A0A0A0]">Keep yourself updated? Please enter your details.</p>
            <button 
            onClick={handleGoogleLogin}
            className="mt-8 flex items-center justify-center rounded-md border border-[#3A3A3A] px-4 py-2 text-[#E0E0E0] transition hover:bg-[#3B82F6] hover:text-white focus:ring-2 focus:ring-[#3B82F6]">
              <img className="mr-2 h-5" src="https://static.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google" />
              Log in with Google 
            </button>
            <div className="relative mt-8 flex h-px place-items-center bg-[#3A3A3A]">
              <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-[#242424] text-center text-sm text-[#A0A0A0]">or</div>
            </div>
            <form className="flex flex-col pt-3 md:pt-8"
            onSubmit={handleSubmit}
            >
              <div className="flex flex-col pt-4">
                <div className="focus-within:border-b-[#3B82F6] relative flex overflow-hidden border-b-2 transition">
                  <input
                    type="email"
                    id="login-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full flex-1 appearance-none bg-[#242424] px-4 py-2 text-base text-[#E0E0E0] placeholder-[#A0A0A0] focus:outline-none"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="mb-12 flex flex-col pt-4">
                <div className="focus-within:border-b-[#3B82F6] relative flex overflow-hidden border-b-2 transition">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="login-password"
                    className="w-full flex-1 appearance-none bg-[#242424] px-4 py-2 text-base text-[#E0E0E0] placeholder-[#A0A0A0] focus:outline-none"
                    placeholder="Password"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-[#3B82F6] px-4 py-2 text-center text-base font-semibold text-white shadow-md transition hover:bg-blue-600 focus:ring-2 focus:ring-[#3B82F6]"
              >
                Log in
              </button>
            </form>
            <div className="py-12 text-center">
              <p className="whitespace-nowrap text-[#A0A0A0]">
                Don't have an account?
                <Link to="/register" className="underline-offset-4 font-semibold text-[#3B82F6] underline ml-1">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none relative hidden h-screen select-none md:block md:w-1/2">
          <div className="absolute bottom-0 z-10 px-8 text-[#E0E0E0] opacity-100">
            <p className="mb-8 text-3xl font-extrabold leading-10">We work 10x faster than our competitors and stay consistent. While they're bogged down with technical debt, we're releasing new features.</p>
            <p className="mb-4 text-3xl font-extrabold">John Elmond</p>
            <p className="">Founder, Emogue</p>
            <p className="mb-7 text-sm opacity-70">Web Design Agency</p>
          </div>
          <img className="absolute top-0 h-full w-full object-cover opacity-60" src={logo} alt="Background" />
        </div>
      </div>
    </div>
  )
}

export default Login
