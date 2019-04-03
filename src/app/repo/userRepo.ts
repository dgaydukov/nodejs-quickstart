import { getRepository, Repository } from 'typeorm';
import User from '../../entity/user';
import Session from '../../entity/session';
import whitelist from '../../entity/whitelist';
import {dblSha, validateEmail} from '../helpers';
import uuidv4 = require('uuid/v4');
import rp = require('request-promise');
import {IAuth, UserStatus} from '../interfaces';
import {sendEmail} from '../email';

export default class UserRepo {

    private repo: Repository<User>;
    private sessionRepo: Repository<Session>;
    private whitelistRepo: Repository<whitelist>;

    constructor(){
        this.repo = getRepository(User);
        this.sessionRepo = getRepository(Session);
        this.whitelistRepo = getRepository(whitelist);
    }
    
    async signIn(username: string, password: string): Promise<IAuth>{
        const user = await this.repo.findOne({email: username, password_hash: this.getPwdHash(password)});
        if(!user || user.status !== UserStatus.Verified){
            throw new Error('User not found or inactive');
        }
        let session = await this.sessionRepo.findOne({user_id: user.id});
        if(!session){
            session = await this.sessionRepo.create({user_id: user.id});
        }
        session.timestamp = Date.now().toString();
        session.key = dblSha(session.user_id + uuidv4() + process.env.SALT);
        await this.sessionRepo.save(session);
        return {userId: user.id, authToken: session.key};
    }
    
    async signUp(load, baseurl: string): Promise<string>{
        // send email, check the code and then register user
        if(load.password !== load.password_repeat){
            throw new Error(`Passwords don't match`);
        }
        if(!validateEmail(load.email)){
            throw new Error(`Incorrect email address`);
        }
        load.password_hash = this.getPwdHash(load.password);
        load.status = UserStatus.Registered;
        load.confirmation_code = dblSha(uuidv4() + process.env.SALT);
        this.sendConfirmationEmail(load.email, load.confirmation_code, baseurl);
        const item = await this.repo.create(load);
        const user = await this.repo.save(item);
        return (user as any).id;
    }

    private async sendConfirmationEmail(email: string, code: string, baseurl: string){
        const link = `${baseurl}/v1/auth/verify/${encodeURIComponent(code)}`;
        sendEmail(process.env.EMAIL_FROM, email, 'Confirm signup', `Click the link <a href='${link}'>${link}</a> to confirm the signup`);
    }

    private getPwdHash(password: string){
        return dblSha(password + process.env.SALT);
    }
    

    async checkAuth(auth: IAuth): Promise<boolean>{
        if(!auth.userId || !auth.authToken){
            throw new Error(`Missing userId or authToken headers`);
        }
        const session = await this.sessionRepo.findOne({key: auth.authToken});
        if(!session){
            throw new Error(`Session not found`);
        }
        if(session.user_id !== auth.userId){
            throw new Error(`Session key doesn't correspond to user`);
        }
        const timePassed = Date.now() - Number(session.timestamp);
        if(timePassed > Number(process.env.USER_SESSION_LIMIT_IN_DAYS) * 86400 * 10**3){
            throw new Error(`Session time has expired`);
        }
        return true;
    }

    async verify(token: string){
        const user = await this.repo.findOne({confirmation_code: token, status: UserStatus.Registered});
        if(!user){
            throw new Error(`User hasn't been found`);
        }
        user.status = UserStatus.Verified;
        await this.repo.save(user);
        return {status: `verified`};
    }
}