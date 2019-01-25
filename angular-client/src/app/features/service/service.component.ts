import { Component, OnInit } from '@angular/core';
import { AuthService, I18nService } from '../../core/service/index';
import { User, Team, ServiceService } from './service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html'
})
export class ServiceComponent implements OnInit {

  isInit: boolean;
  profile: any;
  team: Team;
  name: string;
  age: number;
  user: User;
  users: User[];

  constructor(
    private auth: AuthService,
    private i18n: I18nService,
    private serviceService: ServiceService
  ) {
    this.isInit = true;
  }

  ngOnInit() {
    this.isInit = false;
    this.getUsers();
  }

  getProfile() {
    this.profile = this.auth.getUserInfo();
  }

  clearProfile() {
    this.profile = null;
  }

  switchLang(lang: string) {
    this.i18n.switchLang(lang);
  }

  getTeam() {
    this.serviceService.getTeam().subscribe(
      (data: Team) => {
        this.team = data;
      }, (err: any) => {
        //
      }, () => {
        //
      }
    );
  }

  addUser() {
    this.serviceService.addUser({name: this.name, age: this.age}).subscribe(
      (data: User) => {
        this.users.push({name: this.name, age: this.age});
        this.user = data;
      }, (err: any) => {
        //
      }, () => {
        //
      }
    );
  }

  getUsers() {
    this.serviceService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      }, (err: any) => {
        //
      }, () => {
        //
      }
    );
  }

  closeTeamDetail() {
    this.team = null;
  }


  error500() {
    this.serviceService.testError('500').subscribe(
      (data) => {

      }, (err: any) => {
        //
      }, () => {
        //
      }
    );

  }

  error401() {
    this.serviceService.testError('401').subscribe(
      (data) => {

      }, (err: any) => {
        //
      }, () => {
        //
      }
    );
  }

  error404() {
    this.serviceService.testError('404').subscribe(
      (data) => {

      }, (err: any) => {
        //
      }, () => {
        //
      }
    );
  }

}
