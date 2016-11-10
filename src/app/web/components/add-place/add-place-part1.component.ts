import { Component, OnInit }                       from '@angular/core';
import { UserService }                             from '../../../core/@core';
import { COUNTRIES, MARKER_PATH, DEFAULT_COUNTRY } from '../../../core/@core';

declare var google: any;

@Component({
    moduleId: module.id,
    selector: 'add-place-part-1',
    templateUrl: 'add-place-part1.component.html',
    styleUrls: ['add-place-part1.component.css']
})

export class AddPlacePart1Component implements OnInit {

    marker: any;
    places: any;
    choosenPlace: any;
    placeService: any;
    map: any;
    infoWindow: any;
    markers: any = [];
    autocomplete: any;
    autocompletePlaces: any;
    countryRestrict: any = { 'country': 'de' };
    defaultCountry: string = DEFAULT_COUNTRY;
    MARKER_PATH: any = MARKER_PATH;
    countries: any = COUNTRIES;

    constructor() { }

    ngOnInit() {

        const mapProp = {
            center: this.countries[this.defaultCountry].center,
            zoom: this.countries[this.defaultCountry].zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(document.getElementById('map'), mapProp);
        this.infoWindow = new google.maps.InfoWindow({ map: this.map });
        this.places = new google.maps.places.PlacesService(this.map);
        this.placeService = new google.maps.places.PlacesService(this.map);

        this.marker = new google.maps.Marker({
            map: this.map,
            anchorPoint: new google.maps.Point(0, -29)
        });

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position: any) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                this.marker.setPosition(pos);
                this.marker.setVisible(true);
                this.map.setZoom(17);
                this.map.setCenter(pos);
            }, () => {
                this.handleLocationError(true, this.infoWindow, this.infoWindow.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            this.handleLocationError(false, this.infoWindow, this.infoWindow.getCenter());
        }
        google.maps.event.addListener(this.map, 'click', (event: any) => {
            this.getPlacesByLocation({
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            }, this.map);

        });

        this.autocomplete = new google.maps.places.Autocomplete(
               /** @type {!HTMLInputElement} */(
                document.getElementById('autocomplete')), {
                types: ['(cities)'],
                componentRestrictions: this.countryRestrict
            });

        this.autocompletePlaces = new google.maps.places.Autocomplete(
          /** @type {!HTMLInputElement} */(document.getElementById('pac-input'))
        );
        this.autocompletePlaces.bindTo('bounds', this.map);

        this.autocompletePlaces.addListener('place_changed', (place: any) => {
            this.setPlace(this.autocompletePlaces.getPlace());
        });
        google.maps.event.addListener(this.infoWindow, 'closeclick', () => {
            this.infoWindow.close()
        });


        // Add a DOM event listener to react when the user selects a country.
        document.getElementById('country').addEventListener(
            'change', () => {
                var country = (<HTMLInputElement>document.getElementById('country')).value;
                this.autocomplete.setComponentRestrictions({ 'country': country });
                this.map.setCenter(this.countries[country].center);
                this.map.setZoom(this.countries[country].zoom);
            });

    }

    setPlace(place: any) {
        console.log(place);

        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }
        this.placeService.getDetails({ placeId: place.id }, (place: any, status: any) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                place = place;

                this.choosenPlace = place;
                console.log(this.choosenPlace)
            }
        });
        // If the place has a geometry, then present it on a map.
        if (place && place.geometry.viewport) {
            this.map.fitBounds(place.geometry.viewport);
        } else {
            this.map.setCenter(place.geometry.location);
            this.map.setZoom(17);  // Why 17? Because it looks good.
        }
        this.putMarker(place.geometry.location);
        this.infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.vicinity);
    }

    putMarker(location: any) {
        this.infoWindow.close();
        this.marker.setVisible(false);
        this.marker.setIcon(/** @type {google.maps.Icon} */({
            url: this.MARKER_PATH,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        this.marker.setPosition(location);
        this.marker.setVisible(true);
        this.infoWindow.open(this.map, this.marker);
    }

    getPlacesByLocation(location: any, map: any) {
        // Get places near by
        const request = {
            location: location,
            radius: '10',
            types: ['restaurant', 'cafe', 'bar', 'meal_takeaway', 'meal_delivery']
        };
        let service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results: any, status: any) => {
            console.log(results);
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                if (results.length) {
                    this.setPlace(results[0]);
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
