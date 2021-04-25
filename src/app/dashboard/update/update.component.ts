import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {User} from '../../auth/model/user';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  showErrorMessage = false;
  @Input() user: User;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedId().subscribe((loggedIn: boolean) => {
      this.showErrorMessage = !loggedIn;
      if (loggedIn) {
        this.router.navigateByUrl('');
      }
    });
  }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  update(): void {
    this.authService.update(
      this.user.id,
      this.user.login,
      this.user.surname,
      this.user.name,
      this.user.patronymic,
      this.user.series,
      this.user.number
    );
  }

}
