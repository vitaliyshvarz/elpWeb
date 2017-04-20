import {BASE_URL} from '../../elpserverconfig';// tslint:disable

export const BACKEND_API: any = {
    'signup': `${BASE_URL}/signup`,
    'login': `${BASE_URL}/login`,

    'upload': `${BASE_URL}/upload`,

    'addUser': `${BASE_URL}/add-user`,
    'getAllUsers': `${BASE_URL}/users`,
    'getUserById': `${BASE_URL}/user/`,
    'deleteUser': `${BASE_URL}/user/`,
    'updateUser': `${BASE_URL}/user/`,

    'addMeal': `${BASE_URL}/add-meal`,
    'getAllMeals': `${BASE_URL}/meals`,
    'getMealById': `${BASE_URL}/meal/`,
    'updateMeal': `${BASE_URL}/meal/`,
    'deleteMeal': `${BASE_URL}/meal/`,
    'getMealsByIds': `${BASE_URL}/meals-by-ids/`,

    'addPlace': `${BASE_URL}/add-place`,
    'getAllPlaces': `${BASE_URL}/places`,
    'getPlaceById': `${BASE_URL}/place/`,
    'updatePlace': `${BASE_URL}/place/`,
    'deletePlace': `${BASE_URL}/place/`,

    'searchUsers': `${BASE_URL}/search-users/`,
    'searchPlaces': `${BASE_URL}/search-places/`,
    'searchMeals': `${BASE_URL}/search-meals/`,

    'getCurrentUser': `${BASE_URL}/me`
};
