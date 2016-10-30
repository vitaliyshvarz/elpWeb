import { Component, ngOnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css']
})

export class AppComponent implements ngOnInit{

  ngOnInit() {
    /* tslint:disable */
    $(document).foundation();
    /* tslint:enable */
  }
}
