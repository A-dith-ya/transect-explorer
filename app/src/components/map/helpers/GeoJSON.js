import { Map } from 'leaflet'
import { geometry_types } from '../../../constants/Map'
import { calculateCenter, calculateDistance, calculateHaverSine, calculateUTM } from './Calculate'
import L from 'leaflet'

const length = 0.745201235056549
const width = 1.135711669921875

export function toGeoJSON (
  verticies, geometryType
) {
  let coordinates = verticies
  console.log(coordinates);

  //let distance = calculateDistance(vertices)
  const center = calculateCenter(coordinates)

  if (geometry_types.polygon === geometryType) {
    coordinates.push(verticies[0])
  }
  
  return {
    type: 'Feature',
    geometry: {
      type: geometryType,
      coordinates: [coordinates]
    },
    properties: {
      name: 'Example Polyline',
      center: center,
      utm: calculateUTM(center),
      //distance: geometry_types.linestring && distance
      // Add additional properties if needed
    }
  }
}

export function toMarkers (vertices) {
  const featureCollection = {
    type: 'FeatureCollection',
    features: []
  }

  vertices.forEach(verticy => {
    featureCollection.features.push(
      {
        type: 'Feature',
        properties: {
          name: 'Marker 1',
        },
        geometry: {
          type: 'Point',
          coordinates: [verticy[0], verticy[1]], // [longitude, latitude]
        }
      }
    )
  })

  return featureCollection
}

export function createUserGeo(map) {
  const latLngBounds = map.getBounds()
  const latlngs = []

  latlngs.push(latLngBounds.getSouthWest())
  latlngs.push(latLngBounds.getSouthEast())
  latlngs.push(latLngBounds.getNorthEast())
  latlngs.push(latLngBounds.getNorthWest())

  const geo = L.polygon(latlngs).toGeoJSON()

  geo.properties.center = latLngBounds.getCenter()
  geo.properties.north_east = latLngBounds.getNorthEast()
  geo.properties.south_west = latLngBounds.getSouthWest()
  geo.properties.zoom = map.getZoom()

  return geo
}

function createBoundsFromCenter(center) {
  const latlngs = []
  latlngs.push({lng: center.lng + width, lat: center.lat + length})
  latlngs.push({lng: center.lng + width, lat: center.lat - length})
  latlngs.push({lng: center.lng - width, lat: center.lat - length})
  latlngs.push({lng: center.lng - width, lat: center.lat + length})
  latlngs.push({lng: center.lng + width, lat: center.lat + length})

  const geo = L.polygon(latlngs).toGeoJSON()

  geo.properties.center = center
  geo.properties.north_east = {
    lat: center.lat + length,
    lng: center.lng + width,
  }
  geo.properties.south_west = {
    lat: center.lat - length,
    lng: center.lng - width,
  }
  geo.properties.timestamp = Date.now()

  return geo
}

export function createBuffer(
  center,
  direction
) {
  let newCenter = center
  if (direction) {
    const char = direction.charAt(0)
    switch (char) {
      case 'n':
        newCenter = { lat: center.lat + 2 * length, lng: center.lng }
        if (direction.length > 1) {
          if (direction.charAt(1) === 'e') {
            newCenter.lng = newCenter.lng + 2 * width
          }
          if (direction.charAt(1) === 'w') {
            newCenter.lng = newCenter.lng - 2 * width
          }
        }
        break
      case 's':
        newCenter = { lat: center.lat - 2 * length, lng: center.lng }
        if (direction.length > 1) {
          if (direction.charAt(1) === 'e') {
            newCenter.lng = newCenter.lng + 2 * width
          }
          if (direction.charAt(1) === 'w') {
            newCenter.lng = newCenter.lng - 2 * width
          }
        }
        break
      case 'e':
        newCenter = { lat: center.lat, lng: center.lng + 2 * width }
        break
      case 'w':
        newCenter = { lat: center.lat, lng: center.lng - 2 * width }
        break
      default:
        newCenter = center
    }
  }

  return createBoundsFromCenter(newCenter)
}

export function getClosestBuffer(geojson, features) {
  let closestDistance = 99999
  let closestFeature
  const userCenter = geojson.properties.center

  features.forEach((feature) => {
    const center = feature.properties.center
    const temp = calculateHaverSine(
      userCenter.lat, userCenter.lng, 
      center.lat, center.lng
    )
    if (temp < closestDistance) {
      closestDistance = temp
      closestFeature = feature
    }
  })

  return closestFeature
}
