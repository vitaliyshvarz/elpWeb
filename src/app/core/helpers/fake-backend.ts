import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: (backend: any, options: any) => {
        // array in local storage for registered users
        let users: any[];
        let places: any[];
        try {
            places = JSON.parse(localStorage.getItem('places')) || [];
            users = JSON.parse(localStorage.getItem('users')) || [];
        } catch (err) {
            users = [];
            places = [];
        }

        // configure fake backend
        backend.connections.subscribe((connection: MockConnection) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

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
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200,
                            body: {
                                id: user.id,
                                email: user.email,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                token: 'fake-jwt-token'
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
                if (connection.request.url.match(/\/api\/search-places\/\d+$/) &&
                    connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return place if valid,
                    // this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find place by pattern in places array
                        let urlParts = connection.request.url.split('/');
                        let pattern = parseInt(urlParts[urlParts.length - 1], 10);
                        let matchedUsers = places.filter(place => { return place.name.indexOf(pattern); });
                        let place = matchedUsers.length ? matchedUsers[0] : null;

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

                // get place by id
                if (connection.request.url.match(/\/api\/places\/[a-zA-Z0-9_.-]+$/) &&
                    connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return place if valid,
                    // this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find place by id in places array
                        let urlParts = connection.request.url.split('/');
                        let id = urlParts[urlParts.length - 1];
                        let matchedUsers = places.filter(place => { return place.id === id; });
                        let place = matchedUsers.length ? matchedUsers[0] : null;

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
                if (connection.request.url.match(/\/api\/places\/\d+$/) &&
                    connection.request.method === RequestMethod.Delete) {
                    // check for fake auth token in header and return user if valid,
                    // this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find user by id in places array
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1], 10);
                        for (let i = 0; i < places.length; i++) {
                            let user = places[i];
                            if (user.id === id) {
                                // delete user
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

            });

        });

        return new Http(backend, options);
    },
    deps: [MockBackend, BaseRequestOptions]
};
