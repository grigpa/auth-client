import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {User} from './model/user';
import {Http} from '@angular/http';

@Injectable()
export class AuthService {

  private loggedId$ = new BehaviorSubject<boolean>(this.getToken() !== null ? true : false);
  private isUpdate$ = new BehaviorSubject<boolean>(false);
  private user$ = new BehaviorSubject<User>(this.getUser());

  // Implementation of Http service comes from mock-backend module,
  // in production use real Http service from Angular HttpModule
  constructor(private http: Http, @Inject('AUTH_TOKEN') private authToken: string,
              @Inject('AUTH_USER') private authUser: string) {
  }

  login(login: string, password: string): void {
    this.http.post('/api/auth/signin', {login: login, password: password})
      .subscribe((response: any) => {
        localStorage.setItem(this.authUser, response.text());
        localStorage.setItem(this.authToken, response.headers.get('Set-Authorization'));
        this.user$.next(this.getUser())
        console.log('signin')
        this.loggedId$.next(true);
      }, (err) => {
        this.loggedId$.next(false);
        console.log(err)
      });
  }

  register(
    login: string, password: string,
    surname: string,
    name: string,
    patronymic: string,
    series: string,
    number: string
  ): void {
    this.http.post('/api/auth/signup', {
      login: login, password: password,
      surname: surname, name: name, patronymic: patronymic, series: series, number: number
    })
      .subscribe((response: any) => {
        localStorage.setItem(this.authUser, response.text());
        localStorage.setItem(this.authToken, response.headers.get('Set-Authorization'));
        console.log(this.getUser())
        this.user$.next(this.getUser())

        console.log('signup')
        this.loggedId$.next(true);
      }, (err) => {
        this.loggedId$.next(false);
        console.log(err)
      });
  }

  update(
    id: string, login: string,
    surname: string,
    name: string,
    patronymic: string,
    series: string,
    number: string
  ): void {
    this.http.post('/api/auth/update', {
      id: id, login: login,
      surname: surname, name: name, patronymic: patronymic, series: series, number: number
    })
      .subscribe((response: any) => {
        console.log(response.text())
        localStorage.setItem(this.authUser, response.text());
        this.isUpdate$.next(true);
        this.user$.next(this.getUser())
      }, (err) => {
        this.isUpdate$.next(false);
        console.log(err);
      });
  }

  getUser(): User {
    return new User(JSON.parse(localStorage.getItem(this.authUser)));
  }

  getToken(): string {
    return localStorage.getItem(this.authToken);
  }

  isLoggedId(): BehaviorSubject<boolean> {
    return this.loggedId$;
  }

  isUpdate(): BehaviorSubject<boolean> {
    return this.isUpdate$;
  }

  getUserStream(): BehaviorSubject<User> {
    return this.user$;
  }

  logout(): void {
    localStorage.removeItem(this.authToken);
    localStorage.removeItem(this.authUser);
    this.loggedId$.next(false);
  }
}
