import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTransectsByCreatorId,
  getTransectsByGroupId,
} from "../../services/TransectService";
import "./index.css";

const TransectList = ({ selectedGroupId }) => {
  const [transects, setTransects] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransects = async () => {
      try {
        if (selectedGroupId) {
          const fetchedTransects = await getTransectsByGroupId(selectedGroupId);
          if (fetchedTransects) {
            setTransects(fetchedTransects);
          }
        } else {
          const fetchedTransects = await getTransectsByCreatorId();
          if (fetchedTransects) {
            setTransects(fetchedTransects);
          }
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
    <div className="container-transect-list">
      <h2>Transect List</h2>
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
              <th>UTM Zone</th>
              <th>Northing</th>
              <th>Easting</th>
            </tr>
          </thead>
          <tbody>
            {transects.map((transect) => {
              const utm = JSON.parse(transect.coordinate).properties.utm;
              return (
                <tr
                  key={transect.id}
                  onClick={() => navigate(`/region/transect/${transect.id}`)}
                >
                  <td>{transect?.transectName}</td>
                  <td>{transect?.description}</td>
                  <td>{transect?.location}</td>
                  <td>{utm?.zone}</td>
                  <td>{utm?.northing}</td>
                  <td>{utm?.easting}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransectList;
