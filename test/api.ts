/**
 * Complete test of app API
 */

import {assert} from 'chai';
import rp = require('request-promise');

describe('API integration testing', ()=>{

    const API_URL = 'http://localhost:41222/1.0/';

    describe('Auth test', ()=>{
        const username = `user-${Math.round(Math.random()*10**9)}@gmail.com`;
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
                uri: `${API_URL}/auth/signup`,
                body,
                json: true,
            };
            const result = await rp(options);
            assert.equal(result.length, 36, 'lenght of returned userId should be 36');
        });
    
        it('should signin existing user', async()=>{
            const options = {
                method: 'POST',
                uri: `${API_URL}/auth/signin`,
                body: {username, password},
                json: true,
            };
            const result = await rp(options);
            assert.equal(result.userId.length, 36, 'lenght of returned userId should be 36');
            assert.equal(result.authToken.length, 44, 'lenght of returned authToken should be 44');
        });
    
        it('should verify registered user', async()=>{
            const token = '123';
            const options = {
                method: 'POST',
                uri: `${API_URL}/auth/verify/${token}`,
                json: true,
            };
            const result = await rp(options);
            assert.equal(result.status, 'verified', 'Status should be equal to verified');
        });
    });
});