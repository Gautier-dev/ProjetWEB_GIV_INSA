import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [CookieService],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  serverData: JSON;
  employeeData: JSON;
  employee:JSON;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  ngOnInit() {
  }

  sayHi() {
    this.httpClient.get('http://127.0.0.1:5002/').subscribe(data => {
      this.serverData = data as JSON;
      console.log(this.serverData);
    });
  }

  getAllEmployees() {
    this.httpClient.get('http://127.0.0.1:5002/employees').subscribe(data => {
      this.employeeData = data as JSON;
      console.log(this.employeeData);
    });
  }
  getEmployee() {
    this.httpClient.get('http://127.0.0.1:5002/employees/1').subscribe(data => {
      this.employee = data as JSON;
      console.log(this.employee);
    });
  }
  bye() {
    this.cookieService.delete('givinsa_id');
    this.httpClient.delete('http://127.0.0.1:5002/goodbye/' + this.cookieService.get('givinsa_id')).subscribe();
  }
}
