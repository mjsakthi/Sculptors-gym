if (jQuery("#gmap_canvas2").length) {
  function init_map2() {
    var e = {
      zoom: 10,
      center: new google.maps.LatLng(48.8583698, 2.2944833000000244),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [{ color: "#ffffff" }, { lightness: 17 }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }],
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [{ color: "#ffffff" }, { lightness: 18 }],
        },
        {
          featureType: "road.local",
          elementType: "geometry",
          stylers: [{ color: "#ffffff" }, { lightness: 16 }],
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }, { lightness: 21 }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#dedede" }, { lightness: 21 }],
        },
        {
          elementType: "labels.text.stroke",
          stylers: [
            { visibility: "on" },
            { color: "#ffffff" },
            { lightness: 16 },
          ],
        },
        {
          elementType: "labels.text.fill",
          stylers: [
            { saturation: 36 },
            { color: "#333333" },
            { lightness: 40 },
          ],
        },
        { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#f2f2f2" }, { lightness: 19 }],
        },
        {
          featureType: "administrative",
          elementType: "geometry.fill",
          stylers: [{ color: "#fefefe" }, { lightness: 20 }],
        },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }],
        },
      ],
    };
    (map2 = new google.maps.Map(document.getElementById("gmap_canvas2"), e)),
      (marker2 = new google.maps.Marker({
        map: map2,
        position: new google.maps.LatLng(48.8583698, 2.2944833000000244),
        optimized: !1,
        icon: new google.maps.MarkerImage("images/marker.png"),
      })),
      marker2.setDraggable(!0),
      (infowindow2 = new google.maps.InfoWindow({
        content:
          "<strong>Title</strong><br>Tour Eiffel, 5 Avenue Anatole France, 75007 Paris, France<br>",
      })),
      google.maps.event.addListener(marker2, "click", function () {
        infowindow2.open(map2, marker2);
      });
  }
  google.maps.event.addDomListener(window, "load", init_map2);
}
