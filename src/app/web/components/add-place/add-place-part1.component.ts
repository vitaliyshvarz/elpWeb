import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';


import {
    COUNTRIES,
    MARKER_PATH,
    DEFAULT_COUNTRY,
    COUNTRY_NAMES,
    PLACE_TYPES
} from '../../../core/@core';

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
    placeTypes: any = PLACE_TYPES;
    choosenPlace: any;
    placeService: any;
    map: any;
    infoWindow: any;
    markers: any = [];
    autocompleteCities: any;
    autocompletePlaces: any;
    defaultCountry: any = DEFAULT_COUNTRY;
    MARKER_PATH: any = MARKER_PATH;
    countries: any = COUNTRIES;
    countryNames: any = COUNTRY_NAMES;

    constructor(
        private zone: NgZone,
        private router: Router,
        private alertService: AlertService
    ) { }

    ngOnInit() {

        try {
            const mapProp = {
                center: this.countries[this.defaultCountry.value].center,
                zoom: this.countries[this.defaultCountry.value].zoom,
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
            if (navigator.geolocation && !(localStorage.getItem('currentPlace') || false)) {
                navigator.geolocation.getCurrentPosition((position: any) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    this.map.setZoom(17);
                    this.map.setCenter(pos);
                }, () => console.warn('geolocation is not available'));
            }
            google.maps.event.addListener(this.map, 'click', (event: any) => {
                this.getPlacesByLocation({
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                }, this.map);

            });

            this.autocompleteCities = new google.maps.places.Autocomplete(
               /** @type {!HTMLInputElement} */(
                    document.getElementById('autocomplete-cities')), {
                    types: ['(cities)'],
                    componentRestrictions: { 'country': this.defaultCountry.value }
                });

            this.autocompletePlaces = new google.maps.places.Autocomplete(
          /** @type {!HTMLInputElement} */(document.getElementById('autocomplete-places'))
            );
            this.autocompletePlaces.bindTo('bounds', this.map);

            this.autocompleteCities.addListener('place_changed', () => {
                let place = this.autocompleteCities.getPlace();
                this.map.setCenter(place.geometry.location);
                this.map.setZoom(17);  // Why 17? Because it looks good.
            });

            this.autocompletePlaces.addListener('place_changed', (place: any) => {
                this.setPlace(this.autocompletePlaces.getPlace());
            });
            google.maps.event.addListener(this.infoWindow, 'closeclick', () => {
                this.infoWindow.close();
            });

            this.initSavedPlace();
        } catch (err) {
            console.warn('google is not available, you are offline');
            this.alertService.error('you are offline', true);
        }
    }

    goToStep2() {
        localStorage.setItem('currentPlace', JSON.stringify(this.choosenPlace));
        this.router.navigate(['/join-us', 'part2']);
    }

    setCountry(country: string) {
        this.autocompleteCities.setComponentRestrictions({ 'country': country });
        this.map.setCenter(this.countries[country].center);
        this.map.setZoom(this.countries[country].zoom);
    }

    setPlace(place: any) {

        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert(`No details available for input: '${place.name}'`);
            return;
        }
        this.placeService.getDetails(place, (detailedPlace: any, status: any) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                place = detailedPlace;
                this.zone.run(() => this.choosenPlace = detailedPlace);
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
        this.infoWindow.setContent(`<div><strong>${place.name}</strong><br>${place.vicinity}</div>`);
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
            types: this.placeTypes
        };
        let service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results: any, status: any) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                if (results.length) {
                    this.setPlace(results[0]);
                }
            }
        });
    }

    initSavedPlace() {
        const savedPlace: any = localStorage.getItem('currentPlace') || false;
        if (savedPlace) {
            this.choosenPlace = JSON.parse(savedPlace);
            this.setPlace(this.choosenPlace);
        }
    }

}
