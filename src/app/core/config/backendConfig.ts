import {BASE_URL} from '../../elpserverconfig';

export const BACKEND_API: any = {
  'login': `${BASE_URL}/login`,
  'getAllUsers': `${BASE_URL}/users`,
  'getUserById': `${BASE_URL}/user/`,
  'deleteUser':  `${BASE_URL}/user/`,
  'signup': `${BASE_URL}/signup`,
  'upload': `${BASE_URL}/upload`
};
