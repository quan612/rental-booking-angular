import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input('isAuthenticated') isAuthenticated: boolean = false;
  @Input('username') username: string = '';
  @Input('logout') logout:Function;
  constructor() {}

  ngOnInit(): void {}
}
