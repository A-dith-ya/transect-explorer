import proj4 from 'proj4'
import reproject from 'reproject'
import axios from 'axios'
import {stringify} from 'wkt'

proj4.defs(
  'EPSG:3005',
  '+proj=aea +lat_1=50 +lat_2=58.5 +lat_0=45 +lon_0=-126 +x_0=1000000 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs'
)

export async function getGeoJSON (layerName, geojson) {
  try {
    const url = buildURLForDataBC(layerName, geojson, true)
    const response = await axios.get(url)
    console.log(response)
    const returnVal = albersToGeog(response.data)
    console.log(returnVal)
    return returnVal
  } catch (e) {
    console.log('error gettting geojson')
    console.dir(e)
  }
}

function albersToGeog (featureCollection) {
  try {
    const reprojected = reproject.reproject(
      featureCollection,
      proj4('EPSG:3005'),
      proj4.WGS84
    )
    return reprojected
  } catch (e) {
    console.log('error converting back to geog from albers:')
    console.log(JSON.stringify(e))
    console.log(e)
  }
}

function buildURLForDataBC (
  layerName,
  geoJSON,
  dataBCAcceptsGeometry,
  pageSize,
  startIndex
) {
  try {
    let baseURL =
      'https://openmaps.gov.bc.ca/geo/pub/wfs?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&outputFormat=json&typeName=pub:'
    const paging = '&startindex=' + startIndex + '&count=' + pageSize
    const projection = '&SRSNAME=EPSG:3005'

    const reprojected = reproject.reproject(
      geoJSON,
      proj4.WGS84,
      proj4('EPSG:3005')
    )
    const reprojectedAsWKT = stringify(reprojected)   // WKT
    const customCQL = '&CQL_FILTER=WITHIN(GEOMETRY,' + reprojectedAsWKT + ')'
    const encodedCQL = dataBCAcceptsGeometry ? encodeURI(customCQL) : ''
    return baseURL + layerName + paging + projection + encodedCQL
  } catch (e) {
    console.log('Unable to build URL')
    console.dir(e)
  }
  return ''
}