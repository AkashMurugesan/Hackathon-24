import { Component } from '@angular/core';
import { ChartComponent } from '../../shared/chart/chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
