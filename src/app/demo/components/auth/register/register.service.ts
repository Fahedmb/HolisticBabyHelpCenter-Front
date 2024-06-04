import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private registerUrl = 'http://localhost:8080/user/Register';

    constructor(private http: HttpClient) { }

    register(registerRequest: {email: string, password: string, firstName: string, lastName: string, phone: string}): Observable<any> {
        return this.http.post<any>(this.registerUrl, registerRequest )
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(`Backend returned code ${error.status}, body was: ${error.error.messageResponse}`);
        }
        return throwError('Something bad happened; please try again later.');
    }
}
