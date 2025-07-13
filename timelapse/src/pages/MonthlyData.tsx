import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../store/Auth';
import SpecificWeekData from './SpecificWeekData';

interface WorkEntry {
  date: string;
  hours: number;
  project: string;
  [key: string]: any;
}

const MonthlyData = () => {
  const { authorizationToken } = useAuth();
  const [monthlyData, setMonthlyData] = useState<WorkEntry[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [showWeekPopup, setShowWeekPopup] = useState<boolean>(false);

  const getMonthData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/Work/monthlyData', {
        headers: {
          Authorization: authorizationToken,
        },
      });
      setMonthlyData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewWeek = (weekNumber: number) => {
    setSelectedWeek(weekNumber);
    setShowWeekPopup(true);
  };

  const handleCloseWeekPopup = () => {
    setShowWeekPopup(false);
    setSelectedWeek(null);
  };

  const getWorkStatus = (hours: number) => {
    if (hours === 40) return { text: 'Completed', color: 'bg-green-100 text-green-800' };
    if (hours > 40) return { text: 'Overtime', color: 'bg-green-100 text-green-800' };
    if (hours < 40 && hours > 0) return { text: 'InCompleted', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Incomplete', color: 'bg-red-100 text-red-800' };
  };

  useEffect(() => {
    getMonthData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Current Month Work Summary</h2>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {monthlyData.map((item, index) => {
                  const status = getWorkStatus(item.totalHours);
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Week {item._id.week}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full font-medium ${status.color}`}>
                          {status.text} ({item.totalHours} hrs)
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleViewWeek(item._id.week)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>


      {showWeekPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
              <h3 className="text-xl font-semibold">Week {selectedWeek} Details</h3>
              <button
                onClick={handleCloseWeekPopup}
                className="text-white bg-red-500 hover:bg-red-600 text-2xl px-3 py-1 rounded"
              >
                X
              </button>

            </div>
            <div className="p-4">
              <SpecificWeekData
                week={selectedWeek}
                onClose={handleCloseWeekPopup}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyData;