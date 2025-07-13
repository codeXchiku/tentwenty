import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../store/Auth';
import { useNavigate } from 'react-router-dom';

const SpecificWeekData = ({ week, year = 2025, onClose }) => {
  const { authorizationToken } = useAuth();
  const [groupedData, setGroupedData] = useState({});
  const navigate = useNavigate();

  const getWeekData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/Work/getWeekData?week=${week}&year=${year}`, {
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
    getWeekData();
  }, [week, year]);

  // Format date like "12 July 2025"
  const formatDate = (dateString:string):string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="p-4 space-y-6 relative">
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
    </div>
  );
};

export default SpecificWeekData;