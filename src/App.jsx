import { useEffect } from 'react'
import L from 'leaflet'
import './App.css'

function App() {
  useEffect(() => {
    const map = L.map('map').fitWorld()

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = position.coords
        map.setView([latitude, longitude], 13)

        L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup('当前位置')
          .openPopup()

        const key = import.meta.env.VITE_AMAP_KEY
        if (!key) {
          console.error('Missing VITE_AMAP_KEY')
          return
        }

        const url =
          `https://restapi.amap.com/v3/place/around?` +
          `key=${key}&location=${longitude},${latitude}` +
          `&keywords=咖啡馆&radius=10000&output=JSON`

        try {
          const res = await fetch(url)
          const data = await res.json()
          data.pois?.forEach(poi => {
            const [lng, lat] = poi.location.split(',').map(Number)
            L.marker([lat, lng]).addTo(map).bindPopup(poi.name)
          })
        } catch (e) {
          console.error('POI search error', e)
        }
      }, err => {
        console.error('Geolocation error', err)
      })
    }
  }, [])

  return <div id="map" style={{ height: '100%', width: '100%' }} />
}

export default App
