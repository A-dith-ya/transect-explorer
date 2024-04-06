import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTransectsByGroupId, getTransectsByCreatorId } from '../../services/TransectService.js'
import "./index.css";

export default TransectList

function TransectList ({ group_id=undefined, user_id=undefined }) {
  const [transects, setTransects] = useState([]);
  const [data, setData] = useState();
  const [sortColumn, setSortColumn] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransects = async () => {
      try {
        if (group_id) {
          const fetchedTransects = await getTransectsByGroupId(group_id);
          if (fetchedTransects) {
            setTransects(fetchedTransects);
          }
        } 
        if (user_id) {
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
  }, [group_id]);

  useEffect(() => {
    console.log(transects);
  }, [transects]);

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
    <div className="table-div transect-list" style={{
    margin: 'auto',
    width: '80%',
    paddingTop: '50px',
    paddingBottom: '50px'
    }}>
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
                onClick={() => navigate("/region/transect")}
              >
                <td>{transect.transectName}</td>
                <td>{transect.description}</td>
                <td>{transect.location}</td>
                <td>{utm.zone}</td>
                <td>{utm.northing}</td>
                <td>{utm.easting}</td>
              </tr>
              );
          })}
        </tbody>
      </table>
    </div>
  )
}

