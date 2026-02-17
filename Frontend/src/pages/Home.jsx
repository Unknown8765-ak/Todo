import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { logout } from "../features/auth/authSlice";

function Home() {
  const { status: authStatus, loading } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (loading) {
    return (
      <div className="w-full py-16 text-center">
        Loading...
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/v1/users/logout", {
        method: "POST",
        credentials: "include",
      });

      dispatch(logout());
      navigate("/");
    } catch (error) {
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">

      <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-lg text-center border border-white/20">

        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-wide">
          Welcome to Todo App
        </h1>

        {!authStatus ? (
          <>
            <p className="text-white/80 mb-8 text-lg">
              Login or Signup to manage your tasks efficiently 🚀
            </p>

            <div className="flex justify-center gap-4">
              <Button
                onClick={() => navigate("/login")}
                bgColor="bg-black/70 text-white hover:bg-black"
              >
                Login
              </Button>

              <Button
                onClick={() => navigate("/signup")}
                bgColor="bg-black/70 text-white hover:bg-black"
              >
                Signup
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-white/80 mb-8 text-lg">
              Ready to manage your tasks? 🔥
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                bgColor="bg-green-500 hover:bg-green-600 text-white"
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard
              </Button>

              <Button
                bgColor="bg-red-500 hover:bg-red-600 text-white"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Home;
