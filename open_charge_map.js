$(document).ready(function(){

    var uluru = {lat: 47.200000, lng: 19.040236};
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 7.5, center: uluru});

    $("#mapButt").on("click", function (ev) {
        $.ajax("https://api.openchargemap.io/v3/poi/?output=json&countrycode=HU&maxresults=100",
        {
            method: "GET",
            data: {
                client: "GM+OCM",
                key: "9783acee-0fd2-4a37-8954-db8d8674a430"
              },
        })
        .done(function (result) {
            //console.log(result);
            putMarkers(result);
        });
    });

    
    function putMarkers(markers) {
        for (let marker in markers){
            console.log(markers[marker]["AddressInfo"]["Latitude"])
            console.log(markers[marker]["AddressInfo"]["Longitude"])
            console.log("___________________________________")
            var position = {
                lat: markers[marker]["AddressInfo"]["Latitude"],
                lng: markers[marker]["AddressInfo"]["Longitude"]
            };
            new google.maps.Marker({position: position, map: map});
        }
    }
});