import {
  BUFFERED_EXTENTS_INITIALIZE,
  BUFFERED_EXTENTS_NO_UPDATE,
  BUFFERED_EXTENTS_UPDATE_ON_ONE_INTERSECTIONS,
  BUFFERED_EXTENTS_UPDATE_ON_TWO_INTERSECTIONS,
  BUFFERED_EXTENTS_UPDATE_ON_THREE_INTERSECTIONS,
  BUFFERED_EXTENTS_UPDATE_ON_NO_INTERSECTIONS
} from '../../../state/actions'
import { calculateCenter, calculateHaverSine } from './Calculate'
import { createBuffer, getClosestBuffer } from './GeoJSON'
import * as turf from '@turf/turf'

export {
  initializeBuffers,
  moveCheck
}

function initializeBuffers(center) {
  const buffer = createBuffer(center)
  return {
    type: BUFFERED_EXTENTS_INITIALIZE,
    features: [buffer],
    fetch_geo: buffer
  }
}

function moveCheck(geojson, bufferedExtents) {
  if (bufferedExtents.initialized) {
    const buffers = bufferedExtents.feature_collection.features
    const intersects = []
    bufferedExtents.feature_collection.features.map((feature) => {
      const intersect = turf.intersect(geojson, feature)
      if (null !== intersect)
        intersects.push(feature)
    })
    let buffer
    let type

    // console.log(`INTERSECTS ${intersects.length}`)
    switch (intersects.length) {
      case 0:
        buffer = zeroIntersections(geojson, intersects)
        type = BUFFERED_EXTENTS_UPDATE_ON_NO_INTERSECTIONS
        break
      case 1:
        buffer = oneIntersection(geojson, intersects)
        type = BUFFERED_EXTENTS_UPDATE_ON_ONE_INTERSECTIONS
        break
      case 2:
        buffer = twoIntersections(geojson, intersects)
        type = BUFFERED_EXTENTS_UPDATE_ON_TWO_INTERSECTIONS
        break
      case 3:
        buffer = threeIntersections(geojson, intersects)
        type = BUFFERED_EXTENTS_UPDATE_ON_THREE_INTERSECTIONS
        break
      default:
        buffer = null
        type = BUFFERED_EXTENTS_NO_UPDATE
    }
    // console.log('BUFFERS BEFORE', bufferedExtents.feature_collection.features)
    if (buffer !== null) buffers.push(buffer)
    else type = BUFFERED_EXTENTS_NO_UPDATE
    // console.log('BUFFERS AFTER', buffers)
    if (5 < buffers.length) {
      const newBuffers = removeFurthestBuffer(geojson, buffers)
      return {
        type: type,
        features: newBuffers,
        fetch_geo: buffer
      }
    }
    return {
      type: type,
      features: buffers,
      fetch_geo: buffer
    }
  }
  return { type: null, buffer: null }
}
function zeroIntersections(geojson, features) {
  const closestBuffer = getClosestBuffer(geojson, features)
  const newBuffer = getNextBuffer(geojson, closestBuffer)
  if (null !== newBuffer)
    return newBuffer
  return null
}

function oneIntersection(geojson, features) {
  const difference = turf.difference(geojson, features[0])
  if (difference) {
    const newBuffer = getNextBuffer(geojson, features[0])
    return newBuffer
  }
  return null
}

function twoIntersections(geojson, features) {
  const coordinates = []
    features.forEach((feature) => {
      feature.geometry.coordinates[0].forEach((coord) => {
        coordinates.push(coord)
      })
    })
  // console.log('COORDINATES ARR: ', coordinates)
  const combinedFeatures = turf.multiPolygon([[coordinates]])
  const difference = turf.difference(geojson, combinedFeatures)
  
  if (difference) {
    const buffer = getClosestBuffer(geojson, features)
    const features_center = calculateCenter(coordinates)
    let newBuffer

    if (features_center.lat < geojson.properties.center.lat
      && geojson.properties.north_east.lat > features[0].properties.north_east.lat
      && geojson.properties.north_east.lat > features[1].properties.north_east.lat)
      newBuffer = createBuffer(buffer.properties.center, 'n')

    if (features_center.lng < geojson.properties.center.lng
      && geojson.properties.north_east.lng > features[0].properties.north_east.lng
      && geojson.properties.north_east.lng > features[1].properties.north_east.lng)
      newBuffer = createBuffer(buffer.properties.center, 'e')

    if (features_center.lat > geojson.properties.center.lat
      && geojson.properties.south_west.lat < features[0].properties.south_west.lat
      && geojson.properties.south_west.lat < features[1].properties.south_west.lat)
      newBuffer = createBuffer(buffer.properties.center, 's')

    if (features_center.lng > geojson.properties.center.lng
      && geojson.properties.south_west.lng < features[0].properties.south_west.lng
      && geojson.properties.south_west.lng < features[1].properties.south_west.lng)
      newBuffer = createBuffer(buffer.properties.center, 'w')

    return newBuffer
  }
  return null
}

function threeIntersections(geojson, features) {
  // Multi polygon for the intersecting extents in regards to the user
  const combinedFeatures = turf.multiPolygon(features.map((feature) => {
    return feature.geometry.coordinates
  }))

  const difference = turf.difference(geojson, combinedFeatures)

  if (difference) {
    // check where each geo is
    const tempFeatures = []
    const directions = []
    let newBuffer

    features.map((feature) => {
      const direction = getDirectionFromCenter(feature, geojson)

      tempFeatures.push({
        ...feature,
        properties: {
          ...feature.properties,
          direction: direction
        }
      })
      directions.push(direction)
    })

    // once all geos are obtained check where to put the next geometry
    // const newExtent = createCornerExtent(coolstring, tempExtents)

    const getAdjacent = (direction1, direction2) => {
      let adjacent
      tempFeatures.forEach((feature) => {
        if (
          feature.properties.direction === direction1 ||
          feature.properties.direction === direction2
        ) {
          adjacent = feature
        }
      })
      return adjacent
    }

    const getCornerExtent = (direction, adjacent) => {
      if (adjacent.properties.direction.includes('n')) {
        return createBuffer(
          adjacent.properties.center,
          direction[0] === 'n' ? direction[1] : direction[0]
        )
      }
      if (adjacent.properties.direction.includes('s')) {
        return createBuffer(
          adjacent.properties.center,
          direction[0] === 's' ? direction[1] : direction[0]
        )
      }
    }

    if (!directions.includes('ne')) {
      const adjacent = getAdjacent('nw', 'se')
      newBuffer = getCornerExtent('ne', adjacent)
    }
    if (!directions.includes('nw')) {
      const adjacent = getAdjacent('ne', 'sw')
      newBuffer = getCornerExtent('nw', adjacent)
    }
    if (!directions.includes('se')) {
      const adjacent = getAdjacent('ne', 'sw')
      newBuffer = getCornerExtent('se', adjacent)
    }
    if (!directions.includes('sw')) {
      const adjacent = getAdjacent('nw', 'se')
      newBuffer = getCornerExtent('sw', adjacent)
    }

    return newBuffer
  }
  return null
}

function removeFurthestBuffer(geojson, features) {
  const center = geojson.properties.center

  // let update_cached: boolean = false

  let furthestDistance = -1
  let furthestIndex = -1
  const buffers = features
  // update_cached = true

  buffers.forEach((buffer, index) => {
    const fCenter = buffer.properties.center
    const distance = calculateHaverSine(
      center.lat, center.lng,
      fCenter.lat, fCenter.lng
    )
    if (furthestDistance < distance) {
      furthestDistance = distance
      furthestIndex = index
    }
  })

  const _buffers = features.splice(furthestIndex, 1)
  // console.log('SPLICED', buffers)
  return buffers
}

function getNextBuffer(geojson, feature) {
  if (feature.properties.north_east.lat < geojson.properties.north_east.lat) {
    return createBuffer(feature.properties.center, 'n')
  }
  if (feature.properties.north_east.lng < geojson.properties.north_east.lng) {
    return createBuffer(feature.properties.center, 'e')
  }
  if (feature.properties.south_west.lat > geojson.properties.south_west.lat) {
    return createBuffer(feature.properties.center, 's')
  }
  if (feature.properties.south_west.lng > geojson.properties.south_west.lng) {
    return createBuffer(feature.properties.center, 'w')
  }
  return null
}

function getDirectionFromCenter(geojson, buffer) {
  const center = geojson.properties.center
  const b_center = buffer.properties.center
  let direction = ''

  if (center.lat > b_center.lat)
    direction += 'n'
  if (center.lat < b_center.lat)
    direction += 's'
  if (center.lng > b_center.lng)
    direction += 'e'
  if (center.lng < b_center.lng)
    direction += 'w'

  return direction
}