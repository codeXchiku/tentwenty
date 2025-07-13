import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../store/Auth';

interface WorkFormData {
  project: string;
  type: string;
  description: string;
  hours: string;
}

const AddWorkDetails = () => {
  const { authorizationToken } = useAuth();

  const [formData, setFormData] = useState<WorkFormData>({
    project: '',
    type: '',
    description: '',
    hours: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/api/Work/workEntry', {
        project: formData.project,
        type: formData.type,
        description: formData.description,
        hours: Number(formData.hours),
      },
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      console.log(res);
      
      if (res.status == 201) {
        setFormData({
          project: '',
          type: '',
          description: '',
          hours: '',
        });
      }
    } catch (error) {
      console.error('Error submitting work entry:', error);
      alert('Failed to submit. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <form onSubmit={handleSubmit}>
        {/* Project Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project
          </label>
          <input
            type="text"
            name="project"
            value={formData.project}
            onChange={handleChange}
            placeholder="Enter project name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Type of Work Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type of Work
          </label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Enter type of work"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Task Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Task Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
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
            value={formData.hours}
            onChange={handleChange}
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
            onClick={() =>
              setFormData({ project: '', type: '', description: '', hours: '' })
            }
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWorkDetails;
