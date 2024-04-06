import { useEffect, useState } from 'react';
import { getTransectsByCreatorId } from "../../services/TransectService";
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';
import DrawingBar from '../../components/map/DrawingBar'
import '../../App.css'

function MapPage() {
  const [transects, setTransects] = useState(null);

  useEffect(() => {
    const fetchTransects = async () => {
      try {
        const fetchedTransects = await getTransectsByCreatorId();
        if (fetchedTransects) {
          setTransects(fetchedTransects);
        }
      } catch (error) {
        console.error("Error fetching transects:", error);
      }
    };

    fetchTransects();
  }, []);

  return (
    <MapContainer
      id='map'
      center={[55, -122]}
      zoom={5}
      scrollWheelZoom={true}
      zoomControl={false}>

      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

      {transects && transects.map((transect) => {
        return (
          <GeoJSON key={Math.random()} data={
            JSON.parse(transect.coordinate)
          } />
        );
      })}

    </MapContainer>
  );
}

export default MapPage;
