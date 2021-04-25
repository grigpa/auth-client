import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {User} from '../model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService, private router: Router) {
    this.user = authService.getUser();
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
