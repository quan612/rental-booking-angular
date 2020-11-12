import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input('isAuthenticated') isAuthenticated = false;
  @Input('username') username = '';
  @Input('logout') logout: () => {};

  constructor(private router: Router) {}

  searchByCity = (city: string) => {
    city
      ? this.router.navigate(['/rentals'], {
          queryParams: { city },
          queryParamsHandling: 'merge',
        })
      : this.router.navigate(['/rentals']);
  };
}
