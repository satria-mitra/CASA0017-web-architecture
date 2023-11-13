let map;
var markerArray = [];
var dataArray = [];
var infowindow = new google.maps.InfoWindow({maxWidth: 300});

$(document).ready(function() {

    async function initMap() {
        
        // Task 3.4 - Make the map look pretty
        var mapOptions = {
            center: new google.maps.LatLng(51.514756, -0.104345),
            zoom: 14,
            maxZoom: 18,
            styles: darkMap			
        };
        
        
        
        // Task 3.2 - Write the map into our DIV element
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        google.maps.event.addListener(map, 'dragend', function() {
            var bounds = map.getBounds();
            console.log("SW: " + bounds.getSouthWest() + " NE: " + bounds.getNorthEast());
            console.log("Center: " + map.getCenter().lat() + ", " +  map.getCenter().lng());
            getData(map.getCenter().lat(), map.getCenter().lng());
        });
    }

    function getData(lat, lng){
        var lat = lat.toFixed(2); 
        var lng = lng.toFixed(3);

        console.log("Getting Data: " + lat + ", " + lng );

        setAllMap(null);
        markerArray = [];

        // Task 4.1 - Edit this variable so that it points to our API Look at http://dev.spatialdatacapture.org:8870 for the values you need
        var url = "http://dev.spatialdatacapture.org:8870";
        var rad = 800;

        //http://casa0017.cetools.org:8870/data/:lat/:lon/:radius

        console.log(url + '/data' + '/' + lat + '/' + lng + '/' + rad);
        var url_api = url + '/data' + '/' + lat + '/' + lng + '/' + rad;


        $.getJSON( url_api , function( data ) {
            $.each(data, function(k , v){
                console.log(v);

            
            // Task 4.2 -- Add a loop  Make sure you end it as well.  -- Don't uncomment this line
                
                        var latLng = new google.maps.LatLng(v.lat, v.lon);
                        
                        dataArray.push(latLng);
                        
                        const icon = {
                            url: "./img/pin.png", // url
                            scaledSize: new google.maps.Size(20, 20), // scaled size
                            origin: new google.maps.Point(0,0), // origin
                            anchor: new google.maps.Point(0, 0) // anchor
                        };

                        var marker = new google.maps.Marker({
                          	position: latLng, 
                          	customInfo: v.pid,
                            icon: icon,                            
                            map: map,				
                        });

                        google.maps.event.addListener(marker, 'click', function(content) {
                         	return function(){
                        	infowindow.setContent("");
                                
                         		map.setCenter(new google.maps.LatLng(v.points.y, v.points.x));
                         		$.getJSON("http://dev.spatialdatacapture.org:8870/data/photoDescription/"+this.customInfo, function( data ) {
                         			var dateTaken = new XDate((data[0].date_uploaded * 1000)).toString("MMM d, yyyy HH:mm:ss");
                         			var content = "<b>Photo ID: </b>"+v.pid+"<br/> <br/><b>Description:</b><br/> "+data[0].description.replaceAll("+", " ")+" <br/> <br/><b>Date Taken: </b> "+dateTaken+" <br/><b>Camera: </b> "+data[0].device.replaceAll("+", " ")+"<br/><b>Location:</b> "+ v.points.y + ", " + v.points.x +" <br/><br/> <b>Photo</b> <br/><br/> <img src='"+data[0].download_url+"' width='300px' alt='Description'>";
                         	    	infowindow.setContent(content);
                         	    });
                
                         	    infowindow.open(map,this);
                         	}
                        }(""));

                        markerArray.push(marker);
                        console.log(length.markerArray);
            });

            // -----------------------------------


            // Task 4.3 -- Write the number of rows returned into a element.
              
              setAllMap(map);
              $('#photoNum').html(markerArray.length);
        });
    }

    // Task 3.1 - Start the map using a function
    window.addEventListener('load', function(){
        initMap()
        getData(map.getCenter().lat(), map.getCenter().lng());

    });

    // Task 6 --  Make the markers display on map load.
    initMap();

});

//  ******************* FUNCTIONS TO USE FOR THE MAP YOU DON"T NEED TO EDIT ANYTHING BELOW THIS LINE **************************************************

function createMarkers(){
    var marker = new google.maps.Marker({
          position: latLng 				
      });
}

function setAllMap(map) {
    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(map);
    }
}

function clearMarkers() {
    setAllMarkers(null);
}

String.prototype.replaceAll = function(str1, str2, ignore) {
    return decodeURIComponent( this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2) );
} 

