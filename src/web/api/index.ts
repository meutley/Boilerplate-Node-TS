import { Router as AuthenticationApi } from './authentication/router';
import { Router as TestApi } from './test/router';

export const Routers = [
    AuthenticationApi,
    TestApi
];