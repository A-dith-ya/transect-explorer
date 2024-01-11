import proj4 from 'proj4'

function calculateUTM(position) {
  const {lat, lng} = position
  const zone = ((Math.floor((lng + 180) / 6) % 60) + 1) //getting utm zone
  proj4.defs([
    ['EPSG:4326', '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees'],
    ['EPSG:AUTO', `+proj=utm +zone=${zone} +datum=WGS84 +units=m +no_defs`]
  ])

  const en_m = proj4('EPSG:4326', 'EPSG:AUTO', [lng, lat]) // conversion from (long/lat) to UTM (E/N)
  let easting = Number(en_m[0].toFixed(4))
  let northing = Number(en_m[1].toFixed(4))
  return {
    zone: zone,
    easting: easting,
    northing: northing
  }
}

function calculateCenter (vertices) {
  let lats = 0
  let lngs = 0
  const length = vertices.length

  vertices.map(verticy => {
    lats += verticy[1]
    lngs += verticy[0]
  })

  return { lat: lats/length, lng: lngs/length }
}

function calculateDistance (vertices) {
  let distance = 0

  for (let i = 1; i < vertices.length; i++) {
    distance = distance + calculateHaverSine(
      vertices[i-1][1],
      vertices[i-1][0],
      vertices[i][1],
      vertices[i][0]
    )
  }

  return distance
}

function calculateHaverSine(lat1, lon1, lat2, lon2) {
  const R = 6371 // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return (R * c) // return distance in KM
}

export {
  calculateCenter,
  calculateDistance,
  calculateHaverSine,
  calculateUTM
}