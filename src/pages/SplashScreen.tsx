import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-primary flex flex-col items-center justify-center px-6">
      <div className="animate-scale-in">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
          <span className="text-4xl">🛒</span>
        </div>
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          KathSnap
        </h1>
        <p className="text-white/80 text-center text-sm">
          Express Delivery in Kathmandu Valley
        </p>
      </div>
      
      <div className="absolute bottom-10 flex flex-col items-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
        <p className="text-white/60 text-xs">Loading...</p>
      </div>
    </div>
  );
}