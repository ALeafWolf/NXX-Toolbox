import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import * as realm from './realm';

@Injectable({
	providedIn: 'root'
})
export class RealmAuthGuard implements CanActivate {
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Promise<boolean> | boolean {

		return realm.getValidAccessToken().then(accessToken => {
			return accessToken ? true : false;
		});
	}

}