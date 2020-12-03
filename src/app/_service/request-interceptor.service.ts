import { Injectable, Injector } from "@angular/core";
import {
    HttpErrorResponse,
    HttpHandler,
    HttpHeaderResponse,
    HttpInterceptor,
    HttpProgressEvent,
    HttpRequest,
    HttpResponse,
    HttpSentEvent,
    HttpUserEvent,
    HttpEvent
} from "@angular/common/http";
import { BehaviorSubject, Observable, throwError, from } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Constants } from "../common/constant";
import { StorageService } from "./storage.service";
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    loaderToShow: any;
    constructor(private storageService: StorageService, public auth: AuthService, public router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = this.storageService.get(Constants.STORAGE_VARIABLES.TOKEN);
        let state = this.auth.isAuthenticated();
    
        if (!state) {
            // this.router.navigate(['/login']);
        }
        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        if (!request.headers.has('Content-Type')) {
            // request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        if(request.url == '/product/uploads'){
            console.log('product upload');
            
        }
        console.log('product upload', request.url);
        // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('event--->>>', event);
                    //end loading page with preloader if successful
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                // console.log(error);
                let data = {};
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                
                return throwError(error);
            }));
    }
}
