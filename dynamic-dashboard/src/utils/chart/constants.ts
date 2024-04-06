import { HttpHeaders } from "@angular/common/http";

export const defaultHttpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
	}),
	withCredentials: true
};