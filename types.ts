
export interface StockDataPoint {
  date: string;
  price: number;
}

export interface NewsItem {
  id: number;
  category: string;
  title: string;
  date: string;
  image: string;
  isVideo?: boolean;
  videoUrl?: string;
}

export interface PortfolioItem {
  id: string;
  name: string;
  description: string;
  image: string;
}

export enum TimeRange {
  WEEK = '1W',
  MONTH = '1M',
  QUARTER = 'QTD',
  YEAR = 'YTD'
}
