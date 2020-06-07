let markersAll = []
let map = ' ' 

window.initMap = () => {

    // The location of Maimo
    const maimo = {lat: -34.610490, lng: -58.440860}; //Maimonides <3

    // The map, centered at Maimo
     map = new google.maps.Map(

        document.getElementById('map'),
        {
            zoom: 11,
            center: maimo,
            styles: styles,
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControlOptions: {
                mapTypeIds: []
            },
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            }
        });
        fetchMarkers(map)
}

const fetchMarkers = async (map) => {
    try {
        const response = await fetch('https://embajadas-api-rest.now.sh/markers');
        const json = await response.json();
        json.forEach(marker => {
            addMarker(map, marker);
        });
    } catch (error) {
        console.log(error);
    }
}

const addMarker = (map, marker) => {
        // console.log(marker);
        const {lat,lng,name, description, type} = marker;
        const contentString = 
        `<div>
        <h2>${name}</h2>
        <h3>${description}</h3>
        <h3>${type}</h3>
        </div>`;
        const infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          const icons = {
              'america': '/assets/images/america.png',
              'europa': '/assets/images/europa.png',
              'africa': '/assets/images/africa.png',
              'oceania': '/assets/images/oceania.png',
              'asia': '/assets/images/asia.png',
          }
        
        const markerItem = new google.maps.Marker(
            {
                position:{ lat:parseFloat(lat), lng:parseFloat(lng)}, 
                icon:icons[type],
                map: map,
                customInfo: type
            }
            );
        markerItem.setMap(map);
        markerItem.addListener('click', function(){
            infowindow.open(map, markerItem);
        });
        markersAll.push(markerItem);
}

const handleFilterAmerica = document.querySelector('.america');
const handleFilterEuropa = document.querySelector('.europa');
const handleFilterAfrica = document.querySelector('.africa');
const handleFilterOceania = document.querySelector('.oceania');
const handleFilterAsia = document.querySelector('.asia');
const handleFilterEarth = document.querySelector('.earth');

handleFilterAmerica.addEventListener('click', (e) => {
    e.preventDefault();
    addMarkerFiltered('america')
    })

handleFilterEuropa.addEventListener('click', (e) => {
    e.preventDefault();
    addMarkerFiltered('europa')
    })

handleFilterAfrica.addEventListener('click', (e) => {
    e.preventDefault();
    addMarkerFiltered('africa')
    })

handleFilterOceania.addEventListener('click', (e) => {
    e.preventDefault();
    addMarkerFiltered('oceania')
    })

handleFilterAsia.addEventListener('click', (e) => {
    e.preventDefault();
    addMarkerFiltered('asia')
    })

handleFilterEarth.addEventListener('click', (e) => {
    e.preventDefault();
    showAllMarkers()
    })
    
const addMarkerFiltered = (markerType) => {
    markersAll.forEach((marker)=>{
    marker.setMap(null); //quita todos los markers del mapa
})
    
const markerFiltered = markersAll.filter( (markerItem)=>markerItem.customInfo === markerType)
    console.log(markerFiltered)
    markerFiltered.forEach ((marker) => {
        marker.setMap(map);
        })
    }
    
const showAllMarkers = ( ) => {
    markersAll.forEach((marker)=>{
    marker.setMap(map); //pone todos los markers del mapa
    })
}