import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTransectsByUserCreatorId } from "../../services/TransectService";
import "./index.css";

const TransectList = ({ selectedGroupId }) => {
  const [transects, setTransects] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransects = async () => {
      try {
        const fetchedTransects = await getTransectsByUserCreatorId();
        if (fetchedTransects) {
          setTransects(fetchedTransects);
        }
      } catch (error) {
        console.error("Error fetching transects:", error);
      }
    };

    fetchTransects();
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
      <h1>Transect List</h1>
      <div className="table-div">
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
              <th>Description</th>
              <th>
                Location
                <button
                  className="button_arrows"
                  onClick={() => sortTransects("location")}
                >
                  <i className="fa-solid fa-arrows-alt-v"></i>
                </button>
              </th>
              <th>Coordinate</th>
            </tr>
          </thead>
          <tbody>
            {transects.map((transect) => (
              <tr
                key={transect.id}
                onClick={() => navigate("/region/transect")}
              >
                <td>{transect.transectName}</td>
                <td>{transect.description}</td>
                <td>{transect.location}</td>
                <td>{transect.coordinate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransectList;
