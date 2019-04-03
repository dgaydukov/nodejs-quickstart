/**
 * Complete test of app API
 */

import {assert} from 'chai';
import rp = require('request-promise');

describe('API integration testing', ()=>{

    const API_URL = 'http://localhost:3000/v1/';
    let authData;

    describe('Auth test', ()=>{
        const baseUrl = API_URL + 'auth/';
        const username = `user-${Math.random()*10**6}@gmail.com`;
        const password = 'password';

        it('should signup new user', async()=>{
            const body = {
                email: username,
                password,
                firstname: 'John',
                lastname: 'Doe',
            }
            const options = {
                method: 'POST',
                uri: baseUrl + 'signup',
                body,
                json: true,
            };
            const result = await rp(options);
            assert.equal(result.length, 36, 'lenght of returned userId should be 36');
        });
    
        it('should signin existing user', async()=>{
            const options = {
                method: 'POST',
                uri: baseUrl + 'signin',
                body: {username, password},
                json: true,
            };
            const result = await rp(options);
            authData = result;
            assert.equal(result.userId.length, 36, 'lenght of returned userId should be 36');
            assert.equal(result.authToken.length, 44, 'lenght of returned authToken should be 44');
        });
    });
});