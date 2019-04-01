import { Component, ViewChild } from '@angular/core';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @ViewChild('menuTrigger') menu: any;

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
    this.menu.closeMenu();
    document.getElementById(anchor).scrollIntoView({behavior: 'smooth'});
  }
}
