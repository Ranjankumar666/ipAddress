import React, {useEffect} from 'react';
// import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import L from 'leaflet';
// const accessToken= 'pk.eyJ1IjoicmFuamFuNjY2IiwiYSI6ImNrZXRudGp2MjNuM3cycm5wYzIydnFvdDIifQ.5L6iAzfna8ccd9Q4a95Xow'
// id= 'mapbox/streets-v11'

const Maps = props =>{
  useEffect(() => {
     
     const map = L.map('mapid',{
        center: [...props.coordinates],
        zoom: 20
      })

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', { 
        attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 15, 
        id: 'mapbox/streets-v11', 
        accessToken: 'pk.eyJ1IjoicmFuamFuNjY2IiwiYSI6ImNrZXRudGp2MjNuM3cycm5wYzIydnFvdDIifQ.5L6iAzfna8ccd9Q4a95Xow',
        tileSize: 512,
        zoomOffset: -1
      })
      .addTo(map);

      const marker = L.marker([...props.coordinates]).addTo(map);

      marker.bindPopup(props.location)

      return () =>{
         map.remove();
      }
  },[props.coordinates, props.location])

  return (
    <div id="mapid">
    </div>
    )
}

export default Maps;



   // <div className={classes.mapContainer}>
   //    <Map 
   //    center ={[...props.coordinates]}
   //    zoom={13}
   //    style={{width: '100%', height: '30rem',position: 'relative'}}
   //    >
   //      <TileLayer
   //        attribution ='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   //        url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
   //      >
   //      <Marker position={[...props.coordinates]} >
   //        <Popup position={[...props.coordinates]}>
   //          {props.location}
   //        </Popup>
   //      </Marker>
   //      </TileLayer>
   //    </Map>
   //  </div>
