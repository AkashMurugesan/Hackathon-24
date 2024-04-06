import { Component, OnInit } from '@angular/core';
import { ChartComponent } from '../../shared/chart/chart.component';
import { NgFor } from '@angular/common';
import { ApiService } from '../../services/api.service';
import * as ChartDataModel from '../../../assets/data.json';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartComponent, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  data: any = ChartDataModel;
  sourceData : any =[];
  chartTypes = this.data.default.forEach((data:any) => {
    data.forEach((data:any) => {
      if(data.chartType)
      this.sourceData.push(data)
    })
  })

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getDashboard();
  }

  getDashboard() {
    this.apiService.getDashboard().subscribe({
      next: (response) => {
        this.getLineChart()
      },
      error: (error) => {
        console.log('error');
      },
    });
  }

  getPieChart() {
    this.apiService.getPieChart().subscribe({
      next: (response) => {
        response.data.forEach((data: any)=>{
          this.sourceData.push(data)
        })
      },
      error: (error) => {
        console.log('error');
      },
    });
  }

  getLineChart() {
    this.apiService.getLineChart().subscribe({
      next: (response) => {
        response.data.forEach((data: any)=>{
          this.sourceData.push(data)
        })
        this.getPieChart();
      },
      error: (error) => {
        console.log('error');
      },
    });
  }
}
