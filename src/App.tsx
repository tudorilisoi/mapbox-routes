import React from 'react'
import './App.css'
import Map, { Source, Layer } from 'react-map-gl'
import type { CircleLayer } from 'react-map-gl'
import * as turf from '@turf/turf'

// appx centero of Dublin
const initialCoords = [-6.26031, 53.349805]
const departureCoords = [-6.26031, 53.349805]

const depStyle: CircleLayer = {
  id: 'departure',
  type: 'circle',
  paint: {
    'circle-radius': 15,
    'circle-color': 'lightblue',
    'circle-stroke-color': '#3887be',
    'circle-stroke-width': 3,
  },
}

const warehouse = turf.featureCollection([turf.point(departureCoords)])

function App() {
  return (
    <div className="App">
      <Map
        key={Math.random()}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
        initialViewState={{
          longitude: initialCoords[0],
          latitude: initialCoords[1],
          zoom: 11,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/light-v11"
      >
        <Source id="my-data" type="geojson" data={warehouse}>
          <Layer {...depStyle} />
        </Source>
      </Map>
    </div>
  )
}

export default App
