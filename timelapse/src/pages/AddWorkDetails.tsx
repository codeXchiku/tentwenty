
const AddWorkDetails = () => {
  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <form>
        {/* Project Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Project
          </label>
          <select
            name="project"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">-- Choose Project --</option>
            <option value="Project A">Project A</option>
            <option value="Project B">Project B</option>
            <option value="Project C">Project C</option>
          </select>
        </div>

        {/* Type of Work Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type of Work
          </label>
          <select
            name="workType"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">-- Choose Work Type --</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Testing">Testing</option>
          </select>
        </div>

        {/* Task Description */}
        <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Task Description
  </label>
  <textarea
    name="description"
    rows="5" // You can increase rows for more height
    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
    placeholder="Enter task details"
    required
  ></textarea>
</div>

        {/* Hours */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hours
          </label>
          <input
            type="number"
            name="hours"
            min="0"
            step="0.5"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter hours worked"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md w-full mr-2"
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md w-full ml-2"
            onClick={() => alert("Cancelled")} // Change this to your cancel logic
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWorkDetails;
