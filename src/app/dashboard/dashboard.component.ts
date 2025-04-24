import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private router: Router, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Demo');
  }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
