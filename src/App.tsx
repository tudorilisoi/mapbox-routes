import React from 'react'
import './App.css'
import Map from 'react-map-gl'


// appx centero of Dublin
const initialCoords = [-6.26031, 53.349805]

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
      />
    </div>
  )
}

export default App
