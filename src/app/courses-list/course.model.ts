export interface Course {
  id: number;
  name: string;
  date: Date;
  length: number;
  description: string;
  isTopRated?: boolean;
  authors?: Array<{ id: number, firstName: string, lastName: string }>
}
