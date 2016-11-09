import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/@core';

declare var google: any;

@Component({
    moduleId: module.id,
    selector: 'add-place-part-1',
    templateUrl: 'add-place-part1.component.html',
    styleUrls: ['add-place-part1.component.css']
})

export class AddPlacePart1Component implements OnInit {

    marker: any;
    labels: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    labelIndex: number = 0;
    places: any;
    map: any;
    infoWindow: any;
    markers: any = [];
    autocomplete: any;
    autocompletePlaces: any;
    countryRestrict: any = { 'country': 'de' };
    defaultCountry: string = 'de';
    MARKER_PATH: any = 'https://maps.gstatic.com/intl/en_us/mapfiles/marker_green.png';

    countries: any = {
        'au': {
            center: { lat: -25.3, lng: 133.8 },
            zoom: 4
        },
        'br': {
            center: { lat: -14.2, lng: -51.9 },
            zoom: 3
        },
        'ca': {
            center: { lat: 62, lng: -110.0 },
            zoom: 3
        },
        'fr': {
            center: { lat: 46.2, lng: 2.2 },
            zoom: 5
        },
        'de': {
            center: { lat: 51.2, lng: 10.4 },
            zoom: 5
        },
        'mx': {
            center: { lat: 23.6, lng: -102.5 },
            zoom: 4
        },
        'nz': {
            center: { lat: -40.9, lng: 174.9 },
            zoom: 5
        },
        'it': {
            center: { lat: 41.9, lng: 12.6 },
            zoom: 5
        },
        'za': {
            center: { lat: -30.6, lng: 22.9 },
            zoom: 5
        },
        'es': {
            center: { lat: 40.5, lng: -3.7 },
            zoom: 5
        },
        'pt': {
            center: { lat: 39.4, lng: -8.2 },
            zoom: 6
        },
        'us': {
            center: { lat: 37.1, lng: -95.7 },
            zoom: 3
        },
        'uk': {
            center: { lat: 54.8, lng: -4.6 },
            zoom: 5
        }
    };

    constructor() { }

    ngOnInit() {

        const mapProp = {
            center: this.countries[this.defaultCountry].center,
            zoom: this.countries[this.defaultCountry].zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(document.getElementById('map'), mapProp);
        this.infoWindow = new google.maps.InfoWindow({ map: this.map });

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position: any) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                this.marker = new google.maps.Marker({
                    position: pos,
                    map: this.map,
                    draggable: true,
                    animation: google.maps.Animation.DROP
                });
                this.marker.addListener('click', () => {
                    if (this.marker.getAnimation() !== null) {
                        this.marker.setAnimation(null);
                    } else {
                        this.marker.setAnimation(google.maps.Animation.BOUNCE);
                    }
                });

                this.map.setCenter(pos);
            }, () => {
                this.handleLocationError(true, this.infoWindow, this.infoWindow.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            this.handleLocationError(false, this.infoWindow, this.infoWindow.getCenter());
        }
        google.maps.event.addListener(this.map, 'click', (event: any) => {
            this.addMarker(event.latLng, this.map);
        });


        this.autocomplete = new google.maps.places.Autocomplete(
               /** @type {!HTMLInputElement} */(
                document.getElementById('autocomplete')), {
                types: ['(cities)'],
                componentRestrictions: this.countryRestrict
            });

        //PLACES_____________________________
        this.autocompletePlaces = new google.maps.places.Autocomplete(
          /** @type {!HTMLInputElement} */(document.getElementById('pac-input'))
        );

        this.infoWindow = new google.maps.InfoWindow();
        this.marker = new google.maps.Marker({
            map: this.map,
            anchorPoint: new google.maps.Point(0, -29)
        });

        this.autocompletePlaces.bindTo('bounds', this.map);
        this.autocompletePlaces.addListener('place_changed', () => {
            this.infoWindow.close();
            this.marker.setVisible(false);
            var place = this.autocompletePlaces.getPlace();
            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                this.map.fitBounds(place.geometry.viewport);
            } else {
                this.map.setCenter(place.geometry.location);
                this.map.setZoom(17);  // Why 17? Because it looks good.
            }
            this.marker.setIcon(/** @type {google.maps.Icon} */({
                url: this.MARKER_PATH,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            }));
            this.marker.setPosition(place.geometry.location);
            this.marker.setVisible(true);

            var address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }

            this.infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
            this.infoWindow.open(this.map, this.marker);
        });
        //PLACES_____________________________





        this.places = new google.maps.places.PlacesService(this.map);

        this.autocomplete.addListener('place_changed', () => {
            var place = this.autocomplete.getPlace();
            if (place.geometry) {
                this.map.panTo(place.geometry.location);
                this.map.setZoom(15);
                //this.search();
            } else {
                (<HTMLInputElement>document.getElementById('autocomplete')).placeholder = 'Enter a city';
            }
        });

        // Add a DOM event listener to react when the user selects a country.
        document.getElementById('country').addEventListener(
            'change', () => {
                var country = (<HTMLInputElement>document.getElementById('country')).value;
                if (country == 'all') {
                    this.autocomplete.setComponentRestrictions([]);
                    this.map.setCenter({ lat: 15, lng: 0 });
                    this.map.setZoom(2);
                } else {
                    this.autocomplete.setComponentRestrictions({ 'country': country });
                    this.map.setCenter(this.countries[country].center);
                    this.map.setZoom(this.countries[country].zoom);
                }
            });

    }
    addMarker(latLng: any, map: any) {
        var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

        // Add the marker at the clicked location, and add the next-available label
        // from the array of alphabetical characters.
        var marker = new google.maps.Marker({
            position: {
                lat: latLng.lat(),
                lng: latLng.lng()
            },
            label: this.labels[this.labelIndex++ % this.labels.length],
            map: map,
            icon: image

        });

        var location = {
            lat: latLng.lat(),
            lng: latLng.lng()
        };

        this.getPlacesByLocation(location, map);
        this.searchPlacesByText('restaurant', map, location);

    }

    searchPlacesByText(query: string, map: any, location: any) {
        var request = {
            location: location,
            radius: '50',
            query: query
        };
        let service = new google.maps.places.PlacesService(map);
        service.textSearch(request, (results: any, status: any) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    //console.log('text search place', place);
                    //createMarker(results[i]);
                }
            }
        });
    }

    getPlacesByLocation(location: any, map: any) {
        // Get places near by
        var request = {
            location: location,
            radius: '50',
            type: 'restaurant'
        };

        let service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results: any, status: any) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    console.log(place);
                    // createMarker(results[i]);
                }
            }
        });


    }



    handleLocationError(browserHasGeolocation: boolean, infoWindow: any, pos: any) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');

    }

}
