import { Component } from '@angular/core';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  links = [
    'Home',
    'About',
    'Projects',
    'Contact'
  ];

  constructor(
    public utilService: UtilService
  ) {
  }

  scrollTo(anchor: string): void {
    console.log(anchor);
    document.getElementById(anchor).scrollIntoView({behavior: 'smooth'});
  }
}
