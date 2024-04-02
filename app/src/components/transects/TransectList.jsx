import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTransects } from '../../services/TransectService.js'
import "./index.css";

export default TransectList

function TransectList ({ group_id=undefined, user_id=undefined }) {
  const [transects, setTransects] = useState([]);
  const [data, setData] = useState();
  const [sortColumn, setSortColumn] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const navigate = useNavigate();

  const uri_endpoint = (
    (group_id && `groups/${group_id}`) ||
    (user_id && `users/${user_id}`)
  );


  useEffect(() => {
    if (data === undefined) fetchAndSetTransects();
    console.log(data)
  }, [data]);

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

  async function fetchAndSetTransects() {
    const fetched = await getTransects(uri_endpoint);
    setData(fetched)
  };

  return (
    <div className="table-div transect-list">
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
            <th onClick={() => sortTransects("location")}>
              Location
              <button
                className="button_arrows"
                onClick={() => sortTransects("transectName")}
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
  )
}

