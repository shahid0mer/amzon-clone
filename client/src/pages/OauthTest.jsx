import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function OauthTest() {

  const [profile, setProfile] = useState(null);
  const BACKEND_URL = "http://localhost:5000";

  // ⬅ Step 1: Capture token from URL if redirected
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      console.log("Token Saved:", token);

      // Remove token from URL
      window.history.replaceState({}, "", "/google-auth-test");

        toast.success("Successfully logged in!");
    }
  }, []);

  // ⬅ Step 2: Trigger backend OAuth
  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/api/auth/google`;
  };

  // ⬅ Step 3: Fetch protected profile
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.warning("Login first!");

    const res = await fetch(`${BACKEND_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setProfile(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-10 bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold">Google OAuth Test (React)</h1>

      <button
        onClick={handleGoogleLogin}
        className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg"
      >
        Login With Google
      </button>

      <button
        onClick={fetchProfile}
        className="px-6 py-3 bg-green-600 text-white rounded-md text-lg"
      >
        Fetch Profile
      </button>

      {profile && (
        <pre className="bg-black text-white p-4 rounded-md mt-5 w-full max-w-xl text-sm overflow-auto">
          {JSON.stringify(profile, null, 2)}
        </pre>
      )}
    </div>
  );
}
