
const Login = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-blue-700 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
        <p className="text-lg text-center">
          Track your employee working hours with ease.
        </p>
        {/* You can add an image here */}
        <div className="mt-10">
          <img
            src="https://via.placeholder.com/300x200" // Replace with your image
            alt="Illustration"
            className="w-[300px]"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-semibold mb-6">Login</h2>

          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-between items-center text-sm text-blue-600">
              <a href="#" className="hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
            >
              Login
            </button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
