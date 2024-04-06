import { Component, OnInit } from '@angular/core';
import { ChartComponent } from '../../shared/chart/chart.component';
import { NgFor } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartComponent,NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
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

  constructor(private apiService: ApiService){
  }

  ngOnInit(): void {
    this.getDashboard()
  }

  getDashboard(){
    this.apiService.getDashboard().subscribe({
      next: (response) =>{
        console.log(response)
      }, error: (error) => {
        console.log('error')
      }
    })
  }
}
