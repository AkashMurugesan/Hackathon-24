import { Component } from '@angular/core';
import { ChartComponent } from '../../shared/chart/chart.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartComponent,NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  chartTypes = ['line', 'bar', 'radar'];

  chartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of values',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  };

  options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

}
