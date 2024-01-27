import * as turf from '@turf/turf'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useCallback, useRef } from 'react'
import type { CircleLayer, MapRef } from 'react-map-gl'
import Map, { Layer, Source } from 'react-map-gl'
import './App.css'

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
  const mapRef = useRef<MapRef>(null)
  const onMapLoad = useCallback(() => {
    console.log('Map ref', mapRef.current)
  }, [])
  return (
    <div className="App">
      <Map
        ref={mapRef}
        onLoad={onMapLoad}
        reuseMaps={false}
        key={Math.random()}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
        initialViewState={{
          longitude: initialCoords[0],
          latitude: initialCoords[1],
          zoom: 11,
        }}
        style={{ width: '100vw', height: 400 }}
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
