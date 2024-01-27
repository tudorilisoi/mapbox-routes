import * as turf from '@turf/turf'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useCallback, useRef, useState } from 'react'
import type { CircleLayer, MapRef, SymbolLayer } from 'react-map-gl'
import Map, { Layer, Source } from 'react-map-gl'
import './App.css'

// appx centero of Dublin
const initialCoords = [-6.26031, 53.349805]
const departureCoords = [-6.26031, 53.349805]

const departureProps: CircleLayer = {
  id: 'departure',
  type: 'circle',
  paint: {
    'circle-radius': 15,
    'circle-color': 'lightblue',
    'circle-stroke-color': '#3887be',
    'circle-stroke-width': 3,
  },
}

const pointsProps: SymbolLayer = {
  id: 'points',
  type: 'symbol',
  layout:{
    'icon-image': 'vehicle-icon',
    'icon-size': 1,
    'text-field': ['get', 'orderTime']
  }
  
}

const warehouseFc = turf.featureCollection([turf.point(departureCoords)])

interface PT {
  orderTime:Number
  key:Number
}

function App() {
  const [locations, setLocations] = useState<turf.Feature<turf.Point, PT>[]>([])

  const mapRef = useRef<MapRef>(null)
  const onMapLoad = useCallback(() => {
    console.log('Map ref', mapRef.current)
    mapRef.current?.on('click', ev => {
      const {lngLat}=ev
      const pt = turf.point([lngLat.lng, lngLat.lat], {
        orderTime: Date.now(),
        key: Math.random()
      });
      console.log('add point')
      setLocations((prev)=>[...prev, pt])
    })
  }, [])

  const pointsFc = turf.featureCollection(locations);
  console.log(`🚀 ~ App ~ pointsFc:`, pointsFc)

  return (
    <div className="App">
      <Map
        ref={mapRef}
        onLoad={onMapLoad}
        reuseMaps={false}
        key={'map'}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
        initialViewState={{
          longitude: initialCoords[0],
          latitude: initialCoords[1],
          zoom: 11,
        }}
        // see https://docs.mapbox.com/api/maps/styles/
        // and https://github.com/mapbox/mapbox-gl-styles (seems obsolete)
        style={{ width: '100vw', height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <Source id="departure-data" type="geojson" data={warehouseFc}>
          <Layer {...departureProps} />
        </Source>
        {/* x@ts-ignore */}
        <Source id="points-data" type="geojson" data={pointsFc}>
        <Layer {...pointsProps} />
        </Source>
      </Map>
    </div>
  )
}

export default App
