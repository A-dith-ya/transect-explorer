import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

// Mock function to simulate fetching transects for a specific group
// Replace this with your actual API call
const fetchTransectsForGroup = async (groupId) => {
  // Example transects fetched from the backend for a specific group
  const transects = [
    {
      id: 1,
      transectName: "Transect A",
      location: "Region 1",
      created_at: "Some day",
    },
    {
      id: 2,
      transectName: "Transect B",
      location: "Region 1",
      created_at: "Some day",
    },
    {
      id: 3,
      transectName: "Transect C",
      location: "Region 2",
      created_at: "Some day",
    },
  ];

  // Simulating fetching transects related to the selected group
  return transects;
};

const TransectList = ({ selectedGroupId }) => {
  const [transects, setTransects] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndSetTransects = async () => {
      const fetchedTransects = await fetchTransectsForGroup(selectedGroupId);
      setTransects(fetchedTransects);
    };

    fetchAndSetTransects();
  }, [selectedGroupId]);

  const sortTransects = (columnName) => {
    if (sortColumn === columnName) {
      setIsAscending(!isAscending);
    } else {
      setSortColumn(columnName);
      setIsAscending(true);
    }

    setTransects(
      transects.slice().sort((a, b) => {
        if (isAscending) {
          return a[columnName].localeCompare(b[columnName]);
        } else {
          return b[columnName].localeCompare(a[columnName]);
        }
      })
    );
  };

  return (
    <>
      <div>
        <h1 className="page_title">Transect List</h1>
      </div>
      <div className="page_div">
        <div className="page_div_table">
          <table>
            <thead>
              <tr>
                <th>
                  Transect Name
                  <button
                    className="button_arrows"
                    onClick={() => sortTransects("transectName")}
                  >
                    <i className="fa-solid fa-arrows-alt-v"></i>
                  </button>
                </th>
                <th onClick={() => sortTransects("location")}>
                  Location
                  <button
                    className="button_arrows"
                    onClick={() => sortTransects("transectName")}
                  >
                    <i className="fa-solid fa-arrows-alt-v"></i>
                  </button>
                </th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {transects.map((transect) => (
                <tr
                  key={transect.id}
                  onClick={() => navigate("/region/transect")}
                >
                  <td>{transect.transectName}</td>
                  <td>{transect.location}</td>
                  <td>{transect.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TransectList;
