$(document).ready(function(){

    var allowed = false;
    var userPos = {lat: 47.200000, lng: 19.040236};
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 7.5, center: userPos});

    navigator.geolocation.getCurrentPosition(function(position) {
        allowed = true;
        userPos.lat = position.coords.latitude;
        userPos.lng = position.coords.longitude;
        map.setCenter(userPos);
        map.setZoom(10.5);
    });

    $("#mapButt").on("click", mapRequest);
      

    function mapRequest() {
        $("#mapButt").off("click", mapRequest);
        $("#spinner").toggleClass("d-none");
        $.ajax("https://api.openchargemap.io/v3/poi/?output=json&countrycode=HU&maxresults=1000",
        {
            method: "GET",
            data: {
                client: "GM+OCM",
                key: "9783acee-0fd2-4a37-8954-db8d8674a430"
              },
        })
        .done(function (result) {
            //console.log(result);
            $("#spinner").toggleClass("d-none");
            $("#mapButt").on("click", mapRequest);
            putMarkers(result);
        });
    }

    
    function putMarkers(markers) {
        for (let marker in markers){
            console.log(markers[marker]["AddressInfo"]["Latitude"])
            console.log(markers[marker]["AddressInfo"]["Longitude"])
            console.log("___________________________________")
            var position = {
                lat: markers[marker]["AddressInfo"]["Latitude"],
                lng: markers[marker]["AddressInfo"]["Longitude"]
            };
            if (allowed) {
                if (getDistanceFromLatLonInKm(userPos, position) < 100) {
                    new google.maps.Marker({position: position, map: map});
                }
            } else {
                new google.maps.Marker({position: position, map: map});
            };
        }
    }

    function getDistanceFromLatLonInKm(pos1,pos2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(pos2.lat-pos1.lat);  // deg2rad below
        var dLon = deg2rad(pos2.lng-pos1.lng); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(pos1.lat)) * Math.cos(deg2rad(pos2.lat)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2);

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI/180);
    }
});