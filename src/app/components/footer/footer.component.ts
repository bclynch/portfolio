import { Component } from '@angular/core';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  year = Date.now();

  connectLinks = [
    {
      label: 'Instagram',
      path: 'https://www.instagram.com/edmflare/',
      icon: faInstagram,
      type: 'external'
    },
    {
      label: 'Facebook',
      path: 'https://www.facebook.com/edmflare/',
      icon: faFacebook,
      type: 'external'
    },
    {
      label: 'Twitter',
      path: 'https://twitter.com/edmflare',
      icon: faTwitter,
      type: 'external'
    },
  ];

  constructor(

  ) { }

}
