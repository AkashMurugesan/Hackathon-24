import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartData, SourceChartData } from '../../../utils/chart/types';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements AfterViewInit {
  chart: any = [];
  dynamicCharts: any = [];
  @Input() chartData: any  = {
    chartType : 'line',
    title: 'Dummy',
    xColumnData: [],
    yColumnData: [],
    xColumnName: '',
    yColumnName: ''
  }
  @Input() chartId: string = '';
  constructor() {}
  ngAfterViewInit() {
    this.chart = new Chart(this.chartId, {
      type:this.chartData.chartType,
      data: {
        labels: this.chartData?.xColumnData,
        datasets: [
          {
            label: this.chartData.title,
            data: this.chartData.yColumnData,
            backgroundColor: '#006AFF' 
          },
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
