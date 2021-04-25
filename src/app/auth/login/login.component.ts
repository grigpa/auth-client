import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  showErrorMessage = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedId().subscribe((loggedIn: boolean) => {
      this.showErrorMessage = !loggedIn;
      if (loggedIn) {
        this.router.navigateByUrl('');
      }
    });
  }

  ngOnInit() {
  }

  login(loginForm: NgForm): void {
    this.authService.login(loginForm.value.login, loginForm.value.password);
  }

}
