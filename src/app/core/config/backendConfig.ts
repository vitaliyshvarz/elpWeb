import {BASE_URL} from '../../elpserverconfig';// tslint:disable

export const BACKEND_API: any = {
    'login': `${BASE_URL}/login`,
    'getAllUsers': `${BASE_URL}/users`,
    'getUserById': `${BASE_URL}/user/`,
    'deleteUser': `${BASE_URL}/user/`,
    'updateUser': `${BASE_URL}/user/`,
    'addUser': `${BASE_URL}/add-user`,
    'signup': `${BASE_URL}/signup`,
    'upload': `${BASE_URL}/upload`,
    'getCurrentUser': `${BASE_URL}/me`,
    'addMeal': `${BASE_URL}/add-meal`,
    'getAllMeals': `${BASE_URL}/meals`,
    'getMealById': `${BASE_URL}/meal/`,
    'updateMeal': `${BASE_URL}/meal/`,
    'deleteMeal': `${BASE_URL}/meal/`,
};
