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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="bg-gradient-primary w-full max-w-md rounded-2xl p-8 text-center shadow-xl animate-in fade-in zoom-in-95 duration-1000">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
          <span className="text-4xl">🛒</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">KathSnap</h1>
        <p className="text-white/80 text-sm mb-6">Express Delivery in Kathmandu Valley</p>
      </div>
      
      <div className="absolute bottom-10 flex flex-col items-center">
        <div className="w-6 h-6 border-2  rounded-full animate-spin mb-3"></div>
        <p className="text-muted-foreground text-xs">Loading your experience...</p>
      </div>
    </div>
  );
}