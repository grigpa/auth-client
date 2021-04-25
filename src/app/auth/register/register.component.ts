import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
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

  register(registerForm: NgForm): void {
    this.authService.register(
      registerForm.value.login,
      registerForm.value.password,
      registerForm.value.surname,
      registerForm.value.name,
      registerForm.value.patronymic,
      registerForm.value.series,
      registerForm.value.number
    );
  }

}
