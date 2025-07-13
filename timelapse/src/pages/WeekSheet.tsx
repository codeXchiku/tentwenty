import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../store/Auth';
import AddWorkDetails from './AddWorkDetails';

const WeekSheet = () => {
  const { authorizationToken } = useAuth();
  const [groupedData, setGroupedData] = useState({});
  const [showAddWorkModal, setShowAddWorkModal] = useState<boolean>(false);

  const getCurrentWeekData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/Work/currentWeekData', {
        headers: {
          Authorization: authorizationToken,
        },
      });

      // Group by formatted date
      const grouped = {};
      res.data.forEach((item) => {
        const dateKey = formatDate(item.date);
        if (!grouped[dateKey]) {
          grouped[dateKey] = [];
        }
        grouped[dateKey].push(item);
      });

      setGroupedData(grouped);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentWeekData();
  }, []);

  
  const formatDate = (dateString:string):string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleCloseModal = () => {
    setShowAddWorkModal(false);
    getCurrentWeekData();
  };

  return (
    <div className="p-4 space-y-6 relative">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Current Week Work Log</h2>
        <button
          onClick={()=>setShowAddWorkModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          + Add Today's Work
        </button>
      </div>

      {/* Work Entries List */}
      {Object.keys(groupedData).map((date) => (
        <div key={date} className="space-y-2">
          <h3 className="text-lg font-medium text-gray-800">{date}</h3>
          <div className="space-y-3 pl-4">
            {groupedData[date].map((item, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 ml-10 text-sm">
                <span className="font-medium text-gray-700">{item.project}</span>
                <span className="text-gray-600">{item.type}</span>
                <span className="text-gray-600">{item.hours} hrs</span>
                <span className="text-gray-500">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal/Popup for Add Work */}
      {showAddWorkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Today's Work</h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <AddWorkDetails 
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeekSheet;