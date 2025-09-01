import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = () => {
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-end bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: 'url(/images/signup.png)' }}
    >
      <div className="w-full max-w-md bg-white rounded-lg p-6 space-y-3 mx-auto mb-26">
        <div>
          <Label htmlFor="name" className="block text-base font-bold text-black">Full Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="mt-1 w-full py-2 bg-gray-100 rounded-md text-base font-bold text-black focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-150"
          />
        </div>
        <div>
          <Label htmlFor="phone" className="block text-base font-bold text-black">Phone Number</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </span>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+977 98XXXXXXXX"
              className="mt-1 w-full pl-10 pr-3 py-2 bg-gray-100 rounded-md text-base font-bold text-black focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-150"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="email" className="block text-base font-bold text-black">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mt-1 w-full py-2 bg-gray-100 rounded-md text-base font-bold text-black focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-150"
          />
        </div>
        <div>
          <Label htmlFor="password" className="block text-base font-bold text-black">Password</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.1.9-2 2-2s2 .9 2 2-2 4-2 4m-4-4c0-1.1-.9-2-2-2s-2 .9-2 2 2 4 2 4m6 5v-3a3 3 0 00-3-3H9a3 3 0 00-3 3v3m-3-8h18v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z" />
              </svg>
            </span>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 w-full pl-10 pr-10 py-2 bg-gray-100 rounded-md text-base font-bold text-black focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-150"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {showPassword ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" />
                )}
              </svg>
            </button>
          </div>
        </div>
        <div>
          <Label htmlFor="confirmPassword" className="block text-base font-bold text-black">Confirm Password</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.1.9-2 2-2s2 .9 2 2-2 4-2 4m-4-4c0-1.1-.9-2-2-2s-2 .9-2 2 2 4 2 4m6 5v-3a3 3 0 00-3-3H9a3 3 0 00-3 3v3m-3-8h18v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z" />
              </svg>
            </span>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Confirm your password"
              className="mt-1 w-full pl-10 pr-10 py-2 bg-gray-100 rounded-md text-base font-bold text-black focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-150"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {showConfirmPassword ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" />
                )}
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-center space-x-2">
          <Button
            onClick={handleSignup}
            className="w-1/2 py-1.5 bg-primary text-white font-bold rounded-md hover:bg-primary/90 focus:ring-2 focus:ring-primary/50 focus:ring-offset-1 transition duration-150 text-base"
          >
            Signup
          </Button>
          <Button
            onClick={handleLogin}
            variant="outline"
            className="w-1/2 py-1.5 bg-transparent text-primary font-bold border-none rounded-md hover:bg-primary/10 focus:ring-2 focus:ring-primary/50 focus:ring-offset-1 transition duration-150 text-base"
          >
            Back to Login
          </Button>
        </div>
        <div className="flex justify-center space-x-4 mt-3">
          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-150"
            onClick={() => window.open("https://facebook.com", "_blank")}
          >
            <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5.06 3.66 9.24 8.44 10v-7.09h-2.54v-2.91h2.54v-2.22c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.19 2.24.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.45 2.91h-2.33v7.09c4.78-.76 8.44-4.94 8.44-10 0-5.53-4.5-10.02-10-10.02z"/>
            </svg>
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-150"
            onClick={() => window.open("https://google.com", "_blank")}
          >
            <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.24 10.493v2.476h3.836c-.164 1.055-.836 3.109-3.836 3.109-2.309 0-4.182-1.927-4.182-4.3s1.873-4.3 4.182-4.3c1.036 0 1.982.382 2.709 1.009l1.873-1.873C15.545 4.955 13.964 4 12.24 4 8.255 4 5 7.255 5 11.24s3.255 7.24 7.24 7.24c4.182 0 6.927-2.945 6.927-7.091 0-.491-.045-.873-.1-1.309h-6.827z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}