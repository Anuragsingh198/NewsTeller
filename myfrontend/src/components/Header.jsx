import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import context from "../context/contextProvider";


function Header() {
  const { user, dispatch } = useContext(context); 
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem('user'); 
    navigate("/login");
  };

  return (
    <header className="bg-[#2E2E2E] border-b border-[#3A3A3A] py-4 px-20">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-[#FFFFFF]">NEWS TELLER</span>
        </Link>

        <div className="flex items-center space-x-4">
          {/* Always show Analysis */}
          <Link
            to="/analytics"
            className="text-[#FFFFFF] hover:text-[#B0B0B0] transition-colors"
          >
            Analysis
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-[#FFFFFF] hover:text-[#B0B0B0] transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#4A80F0] hover:bg-[#3A70E0] text-white px-4 py-2 rounded-md transition-colors"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="text-[#FFFFFF] hover:text-[#B0B0B0] transition-colors"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
