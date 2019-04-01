import { Component } from '@angular/core';

import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-pagewrapper',
  templateUrl: './pageWrapper.component.html',
  styleUrls: ['./pageWrapper.component.scss']
})
export class PagewrapperComponent {

  constructor(
    private utilService: UtilService
  ) {
    // want nav always there on page init to start
    this.utilService.scrollDirection = 'up';
  }

}
