export interface ChartData {
  labels?: string[];
  datasets?: any;
  fill?: any
}

interface Datasets {
  label?: string,
  data?: number[],
}

export interface SourceChartData {
  chartType : string ;
  title: string;
  xColumnData?: number[];
  xColumnName?: string;
  yColumnData?: number[];
  yColumnName?: string;
} 