import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, forkJoin } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FalconeServiceService {

  token: string;
  constructor(private http: HttpClient) { }

  getPlanets() {
    return this.http.get<Object[]>('https://findfalcone.herokuapp.com/planets');
  }

  getVehicles() {
    return this.http.get('https://findfalcone.herokuapp.com/vehicles');
  }

  getToken() {
    if(this.token) {
      return of(this.token)
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };
    return this.http.post('https://findfalcone.herokuapp.com/token', {}, httpOptions)
  }

  findFalcone(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
    // this.getToken().subscribe(data => this.token = data.token);
    return this.getToken().pipe(
      switchMap(tokenData => {
        this.token = tokenData['token'];
        body.token = tokenData['token'];
        return this.http.post<any>('https://findfalcone.herokuapp.com/find', body, httpOptions)
      }),
      catchError(error => {
        this.token = '';
        return this.findFalcone(body);
      })
    )
  }

  
}


// forkJoin
//       body.token = token;
//       this.http.post<any>('https://findfalcone.herokuapp.com/find', {}, httpOptions))