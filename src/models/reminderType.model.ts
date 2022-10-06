export interface reminderType {
  id: string;
  title: string;
  city: string;
  description: string;
  dateTime: string;
  weather?: weather;
}

interface weather {
  temp: number;
  description: string;
}
