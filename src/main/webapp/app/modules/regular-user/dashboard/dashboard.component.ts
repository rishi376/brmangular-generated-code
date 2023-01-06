import { Component, OnInit } from '@angular/core';
import { ApplicationInstanceService } from 'app/modules/application/application-instance/application-instance.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private appInstanceService: ApplicationInstanceService) {}

  ngOnInit(): void {
    this.appInstanceService.query({}).subscribe(allInstances => {
      allInstances.body.forEach(eachAppInstance => {
        // TODO: Create the Dashboard entry in the UI
        console.log(eachAppInstance);
      });
    });
  }
}
