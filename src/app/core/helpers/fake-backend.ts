/*jshint bitwise: false*/

import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { DISHES } from '../config/dishesConfig';

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: (backend: any, options: any) => {
        // array in local storage for registered users
        let users: any[];
        let places: any[];
        let meals: any[];
        try {
            meals = JSON.parse(localStorage.getItem('meals')) || [];
            if(!meals.length) {
              meals = DISHES;
            }
        } catch (err) {
            meals = DISHES;
        }
        try {
            users = JSON.parse(localStorage.getItem('users')) || [];
        } catch (err) {
            users = [];
        }
        try {
            places = JSON.parse(localStorage.getItem('places')) || [];
        } catch (err) {
            places = [];
        }

        // configure fake backend
        backend.connections.subscribe((connection: MockConnection) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // upload file
                if (connection.request.url.endsWith('/api/upload-file') &&
                    connection.request.method === RequestMethod.Post) {

                    console.log(connection.request);
                    // Some upload file magic here;

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            result: {
                            }
                        }
                    })));
                }

                // is user admin
                if (connection.request.url.endsWith('/api/is-admin') &&
                    connection.request.method === RequestMethod.Post) {
                    let pendingUser = JSON.parse(connection.request.getBody());
                    let result = false;
                    let adminUser = users.find(user => {
                        return user.email === pendingUser.email && 
                                user.password === pendingUser.password && 
                                    user.type === pendingUser.type;
                    });
                    result = adminUser ? true : false;
                   
                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            result: result
                        }
                    })));
                }

                // authenticate
                if (connection.request.url.endsWith('/api/authenticate') &&
                    connection.request.method === RequestMethod.Post) {
                    // get parameters from post request
                    let params = JSON.parse(connection.request.getBody());
                    // find if any user matches login credentials

                    let filteredUsers = users.filter(user => {
                        return user.email === params.email && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return 200 OK with user details and fake jwt token
                        let user = filteredUsers[0];
                        user.token = 'fake-jwt-token';
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200,
                            body: {
                                user: user
                            }
                        })));
                    } else {
                        // else return 400 bad request
                        connection.mockError(new Error('Username or password is incorrect'));
                    }
                }

                // get users
                if (connection.request.url.endsWith('/api/users') &&
                    connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return
                    // users if valid, this security is implemented server side
                    // in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200, body: users
                        })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 401
                        })));
                    }
                }

                // get user by id
                if (connection.request.url.match(/\/api\/users\/\d+$/) &&
                    connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid,
                    // this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1], 10);
                        let matchedUsers = users.filter(user => { return user.id === id; });
                        let user = matchedUsers.length ? matchedUsers[0] : null;

                        // respond 200 OK with user
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200, body: user
                        })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 401
                        })));
                    }
                }

                // create user
                if (connection.request.url.endsWith('/api/users') &&
                    connection.request.method === RequestMethod.Post) {
                    // get new user object from post body
                    let newUser = JSON.parse(connection.request.getBody());
                    // validation
                    let duplicateUser = users.filter(user => {
                        return user.email === newUser.email;
                    }).length;
                    if (duplicateUser) {
                        return connection.mockError(new Error('User with email "' +
                            newUser.email + '" is already taken'));
                    }

                    // save new user
                    newUser.id = users.length + 1;
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200
                    })));
                }

                // delete user
                if (connection.request.url.match(/\/api\/users\/\d+$/) &&
                    connection.request.method === RequestMethod.Delete) {
                    // check for fake auth token in header and return user if valid,
                    // this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1], 10);
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            if (user.id === id) {
                                // delete user
                                users.splice(i, 1);
                                localStorage.setItem('users', JSON.stringify(users));
                                break;
                            }
                        }

                        // respond 200 OK
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200
                        })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 401
                        })));
                    }
                }

                // update user by id
                if (connection.request.url.match(/\/api\/users\/[a-zA-Z0-9_.-]+$/) &&
                    connection.request.method === RequestMethod.Put) {
                    // check for fake auth token in header and return place if valid,
                    // this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = connection.request.url.split('/');
                        let id = urlParts[urlParts.length - 1];
                        let matchedUsers = users.filter(user => String(user.id) === String(id));
                        let user = matchedUsers.length ? matchedUsers[0] : null;
                        let i: number;

                        for (i = 0; i < users.length; i++) {
                            if (users[i].id === user.id) {
                                users[i] = user;
                            }
                        }

                        localStorage.setItem('users', JSON.stringify(users));

                        // respond 200 OK with user
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200, body: user
                        })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 401
                        })));
                    }
                }

                // get places
                if (connection.request.url.endsWith('/api/places') &&
                    connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return
                    // places if valid, this security is implemented server side
                    // in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {

                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200, body: places
                        })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 401
                        })));
                    }
                }

                // get places by name
                if (connection.request.url.match(/\/api\/search-places\/[\wа-яА-Я_.-?]+$/) &&
                    connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return place if valid,
                    // this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find place by pattern in places array
                        let urlParts = connection.request.url.split('?');
                        let pattern = urlParts[1].replace('name=', '');
                        let matchedPlaces = places.filter(place => place.name.indexOf(pattern) !== -1);
                        let resultPlaces = matchedPlaces.length ? matchedPlaces : null;
                        // respond 200 OK with place
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200, body: resultPlaces
                        })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 401
                        })));
                    }
                }

                // get places by email
                if (connection.request.url.match(/\/api\/place-by-email\/[\wа-яА-Я_.-@?]+$/) &&
                    connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return place if valid,
                    // this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find place by pattern in places array
                        let urlParts = connection.request.url.split('?');
                        let pattern = urlParts[1].replace('email=', '');
                        console.log(pattern);
                        let matchedPlaces = places.filter(place => place.user.email.indexOf(pattern) !== -1);
                        let resultPlaces = matchedPlaces.length ? matchedPlaces : null;
                        // respond 200 OK with place
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200, body: resultPlaces
                        })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 401
                        })));
                    }
                }

                // get users by name
                if (connection.request.url.match(/\/api\/search-users\/[\wа-яА-Я_.-?]+$/) &&
                    connection.request.method === RequestMethod.Get) {

                    // check for fake auth token in header and return place if valid,
                    // this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find place by pattern in places array
                        let urlParts = connection.request.url.split('?');
                        let pattern = urlParts[1].replace('name=', '');
                        let matchedUsers = users.filter(user =>
                            user.firstName.indexOf(pattern) !== -1 || user.lastName.indexOf(pattern) !== -1);
                        let resultUsers = matchedUsers.length ? matchedUsers : null;
                        // respond 200 OK with place
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200, body: resultUsers
                        })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 401
                        })));
                    }
                }

                // get place by id
                if (connection.request.url.match(/\/api\/places\/[a-zA-Z0-9_.-]+$/) &&
                    connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return place if valid,
                    // this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find place by id in places array
                        let urlParts = connection.request.url.split('/');
                        let id = urlParts[urlParts.length - 1];
                        let matchedPlaces = places.filter(place => { return place.id === id; });
                        let place = matchedPlaces.length ? matchedPlaces[0] : null;

                        // respond 200 OK with place
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200, body: place
                        })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 401
                        })));
                    }
                }

                // update place by id
                if (connection.request.url.match(/\/api\/places\/[a-zA-Z0-9_.-]+$/) &&
                    connection.request.method === RequestMethod.Put) {
                    // check for fake auth token in header and return place if valid,
                    // this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find place by id in places array
                        let urlParts = connection.request.url.split('/');
                        let id = urlParts[urlParts.length - 1];
                        let matchedPlaces = places.filter(place => { return place.id === id; });
                        let place = matchedPlaces.length ? matchedPlaces[0] : null;
                        let i: number;

                        for (i = 0; i < places.length; i++) {
                            if (places[i].id === place.id) {
                                places[i] = place;
                            }
                        }

                        localStorage.setItem('places', JSON.stringify(places));

                        // respond 200 OK with place
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200, body: place
                        })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 401
                        })));
                    }
                }

                // create place
                if (connection.request.url.endsWith('/api/places') &&
                    connection.request.method === RequestMethod.Post) {
                    // get new user object from post body
                    let newPlace = JSON.parse(connection.request.getBody());
                    // validation
                    let duplicatePlace = places
                        .filter(place => place.id === newPlace.id).length;
                    if (duplicatePlace) {
                        return connection.mockError(new Error('Place already exists please update it "' +
                            newPlace.name + '" is already taken'));

                    } else {
                        places.push(newPlace);
                        localStorage.setItem('places', JSON.stringify(places));
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200
                        })));
                    }
                }

                // delete place
                if (connection.request.url.match(/\/api\/places\/[a-zA-Z0-9_.-]+$/) &&
                    connection.request.method === RequestMethod.Delete) {
                    // check for fake auth token in header and return user if valid,
                    // this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find place by id in places array
                        let urlParts = connection.request.url.split('/');
                        let id = urlParts[urlParts.length - 1];
                        let i: number;
                        for (i = 0; i < places.length; i++) {
                            let user = places[i];
                            if (user.id === id) {
                                // delete place
                                places.splice(i, 1);
                                localStorage.setItem('places', JSON.stringify(places));
                                break;
                            }
                        }

                        // respond 200 OK
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200
                        })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 401
                        })));
                    }
                }


                // get meals
                if (connection.request.url.endsWith('/api/meals') &&
                    connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return
                    // meals if valid, this security is implemented server side
                    // in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {

                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200, body: meals
                        })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 401
                        })));
                    }
                }

                // get meals by name
                if (connection.request.url.match(/\/api\/search-meals\/[\wа-яА-Я_.-?]+$/) &&
                    connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return meal if valid,
                    // this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find meal by pattern in meals array
                        let urlParts = connection.request.url.split('?');
                        let pattern = urlParts[1].replace('name=', '');
                        let matchedMeals = meals.filter(meal => meal.name.indexOf(pattern) !== -1);
                        let resultMeals = matchedMeals.length ? matchedMeals : null;
                        // respond 200 OK with place
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200, body: resultMeals
                        })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 401
                        })));
                    }
                }


                // get meal by id
                if (connection.request.url.match(/\/api\/meals\/[a-zA-Z0-9_.-]+$/) &&
                    connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return place if valid,
                    // this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find meal by id in meals array
                        let urlParts = connection.request.url.split('/');
                        let id = urlParts[urlParts.length - 1];
                        let matchedMeal = meals.find(meal => String(meal.id) === String(id));

                        // respond 200 OK with place
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200, body: matchedMeal
                        })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 401
                        })));
                    }
                }

                // update meal by id
                if (connection.request.url.match(/\/api\/meals\/[a-zA-Z0-9_.-]+$/) &&
                    connection.request.method === RequestMethod.Put) {
                    // check for fake auth token in header and return place if valid,
                    // this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find place by id in meals array
                        let urlParts = connection.request.url.split('/');
                        let id = urlParts[urlParts.length - 1];
                        let matchedMeal = meals.find(meal => String(meal.id) === String(id));
                        let i: number;

                        for (i = 0; i < meals.length; i++) {
                            if (meals[i].id === matchedMeal.id) {
                                meals[i] = matchedMeal;
                            }
                        }

                        localStorage.setItem('meals', JSON.stringify(meals));

                        // respond 200 OK with place
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200, body: matchedMeal
                        })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 401
                        })));
                    }
                }

                // create place
                if (connection.request.url.endsWith('/api/meals') &&
                    connection.request.method === RequestMethod.Post) {
                    // get new user object from post body
                    let newMeal = JSON.parse(connection.request.getBody());
                    // validation
                    let duplicateMeal = meals
                        .filter(meal => meal.id === newMeal.id).length;
                    if (duplicateMeal) {
                        return connection.mockError(new Error('Meal already exists please update it "' +
                            newMeal.name + '" is already taken'));

                    } else {
                        meals.push(newMeal);
                        localStorage.setItem('meals', JSON.stringify(meals));
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200
                        })));
                    }
                }

                // delete place
                if (connection.request.url.match(/\/api\/meals\/[a-zA-Z0-9_.-]+$/) &&
                    connection.request.method === RequestMethod.Delete) {
                    // check for fake auth token in header and return user if valid,
                    // this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find place by id in meals array
                        let urlParts = connection.request.url.split('/');
                        let id = urlParts[urlParts.length - 1];
                        let i: number;
                        for (i = 0; i < meals.length; i++) {
                            let meal = meals[i];
                            if (meal.id === id) {
                                // delete meal
                                meals.splice(i, 1);
                                localStorage.setItem('meals', JSON.stringify(meals));
                                break;
                            }
                        }

                        // respond 200 OK
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200
                        })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 401
                        })));
                    }
                }


                // send quick email
                if (connection.request.url.endsWith('/api/quick-email') &&
                    connection.request.method === RequestMethod.Post) {
                    let newQuickEmail = JSON.parse(connection.request.getBody());

                    localStorage.setItem('quickemail', JSON.stringify(newQuickEmail));

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200
                    })));
                }

                // send  email
                if (connection.request.url.endsWith('/api/send-email') &&
                    connection.request.method === RequestMethod.Post) {
                    let newQuickEmail = JSON.parse(connection.request.getBody());

                    localStorage.setItem('email', JSON.stringify(newQuickEmail));

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200
                    })));
                }

                // send  recovery email
                if (connection.request.url.endsWith('/api/send-recovery-pass-email') &&
                    connection.request.method === RequestMethod.Post) {
                    let newRecoveryEmail = connection.request.getBody();
                    let usersFound = users.filter(user => user.email === newRecoveryEmail);

                    localStorage.setItem('recoveryPassEmail', newRecoveryEmail);

                    if (usersFound.length) {
                        // respond 200 OK
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200
                        })));
                    } else {
                        // return 401 user not found
                        connection.mockError(new Error('User with this email does not exist'));
                    }
                }

            });

        });

        return new Http(backend, options);
    },
    deps: [MockBackend, BaseRequestOptions]
};
