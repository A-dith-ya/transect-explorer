import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Mock function to simulate fetching transects for a specific group
// Replace this with your actual API call
const fetchTransectsForGroup = async (groupId) => {
  // Example transects fetched from the backend for a specific group
  const transects = [
    {
      id: 1,
      transectName: "Transect A",
      description: "Description A",
      location: "Region 1",
      coordinate: "Coord A",
    },
    {
      id: 2,
      transectName: "Transect B",
      description: "Description B",
      location: "Region 1",
      coordinate: "Coord B",
    },
    {
      id: 3,
      transectName: "Transect C",
      description: "Description C",
      location: "Region 2",
      coordinate: "Coord C",
    },
    // Add more transects as needed
  ];

  // Simulating fetching transects related to the selected group
  return transects;
};

const TransectList = ({ selectedGroupId }) => {
  const [transectsByLocation, setTransectsByLocation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const groupTransects = async () => {
      const fetchedTransects = await fetchTransectsForGroup(selectedGroupId);
      const groupedByLocation = fetchedTransects.reduce((acc, current) => {
        acc[current.location] = [...(acc[current.location] || []), current];
        return acc;
      }, {});

      console.log(groupedByLocation);

      setTransectsByLocation(groupedByLocation);
    };

    groupTransects();
  }, [selectedGroupId]);

  return (
    <div>
      {Object.keys(transectsByLocation).map((location) => (
        <div key={location} className="group__detail">
          <h1 className="group__detail__title">{location}</h1>
          <ul className="group__detail__information">
            {transectsByLocation[location].map((transect) => (
              <li
                key={transect.id}
                className="member__item"
                onClick={() => navigate("/region/transect")}
              >
                {transect.transectName} - {transect.description}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TransectList;
