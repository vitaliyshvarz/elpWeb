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
    constructor() { }

    ngOnInit() {

        const mapProp = {
            center: new google.maps.LatLng(51.508742, -0.120850),
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        const map = new google.maps.Map(document.getElementById("map"), mapProp);
        var infoWindow = new google.maps.InfoWindow({ map: map });

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position: any) => {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                this.marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    title: 'You are here!'
                });
                this.marker.addListener('click', this.toggleBounce);

                map.setCenter(pos);
            }, () => {
                this.handleLocationError(true, infoWindow, infoWindow.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            this.handleLocationError(false, infoWindow, infoWindow.getCenter());
        }
        google.maps.event.addListener(map, 'click', (event: any) => {
            this.addMarker(event.latLng, map);
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
    toggleBounce() {
        if (this.marker.getAnimation() !== null) {
            this.marker.setAnimation(null);
        } else {
            this.marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }

    handleLocationError(browserHasGeolocation: boolean, infoWindow: any, pos: any) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');

    }
}
