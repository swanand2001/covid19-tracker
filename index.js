function updateMap() {
    console.log("Updating map with realtime data")
    fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(rsp => {
            console.log(rsp);
            rsp.forEach(element => {
                // console.log(element)
                latitude = element.countryInfo.lat;
                longitude = element.countryInfo.long;
                activecases = element.active;
                if(activecases>50000){
                    color="#800000";
                }
                else if(activecases>=10000 && activecases<50000){
                    color="#FF0000"
                }
                else if(activecases>1000 && activecases<10000){
                    color="#ffa500"
                }
                else{
                    color="#006400"
                }
                // if (activecases > 255) {
                //     color = "rgb(255,0,0)";
                // } else {
                //     color = `rgb(${cases},0,0)`;
                // }
                // console.log(element.countryInfo.lat);
                
                var popup = new mapboxgl.Popup({
                    offset: [28, 0]
                }).setHTML(`
                    <div>
                    <p>Country:${element.country}</p>
                    <p>New Cases:${element.todayCases}</p>
                    <p>Recovered Today:${element.todayRecovered}</p>
                    <p>Deaths Today:${element.todayDeaths}</p>
                    <p>Total Cases:${element.cases}</p>
                    <p>Active Cases:${element.active}</p>
                    <p>Total Recovered:${element.recovered}</p>
                    <p>Total Deaths:${element.deaths}</p>
                    </div>
                `);

                // Mark on the map
                let marker = new mapboxgl.Marker({
                        draggable: false,
                        color: color,
                        
                    })
                    .setLngLat([longitude, latitude])
                    .addTo(map);
                    const ele = marker.getElement();
ele.id = 'marker'
// hover event listener
ele.addEventListener('mouseenter', () => popup.addTo(map));
ele.addEventListener('mouseleave', () => popup.remove());
                    marker.setPopup(popup);
            });
        })
}
updateMap()
let interval = 10000;
setInterval(updateMap, interval);