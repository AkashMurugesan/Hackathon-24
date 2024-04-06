import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartData } from '../../../utils/chart/types';

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
  title = 'ng-chart';
  @Input() chartData: ChartData = {};
  @Input() chartTypes: any = '';
  @Input() chartId: string = '';
  constructor() {}

  ngAfterViewInit() {

    this.chart = new Chart(this.chartId, {
      type:this.chartTypes,
      data: {
        labels: this.chartData?.labels,
        datasets: this.chartData.datasets,
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
