import * as Realm from 'realm-web';

export const APP_ID = 'tearsofthemisdb-dznen';
const graphqlUrl = `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`;

// Connect to your MongoDB Realm app
const app = new Realm.App(APP_ID);
const apiKey = 'OhKQMwHcr5QsNa1SRwMV3UUACWXhfSM4qJaXA0fvTfKbICZ6Qr80QmHrlK7H8IId';

// Get a valid Realm user access token to authenticate requests
async function getValidAccessToken(): Promise<string> {
	const credentials = Realm.Credentials.apiKey(apiKey);
    try{
        const user: Realm.User = await app.logIn(credentials);
    }catch(err){
        console.log(err);
    }
    localStorage.setItem('token', app.currentUser.accessToken);
	return app.currentUser.accessToken;
}

export {
	graphqlUrl,
	getValidAccessToken
};