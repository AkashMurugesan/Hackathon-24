export interface ChartData {
  labels?: string[];
  datasets?: any;
  fill?: any
}

interface Datasets {
  label?: string,
  data?: number[],
}