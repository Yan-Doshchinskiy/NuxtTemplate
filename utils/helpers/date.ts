export interface IDateFormat {
  year?: 'numeric' | '2-digit' | undefined;
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined;
  day?: 'numeric' | '2-digit' | undefined;
}

export const formattedDate = (
  date: string | number | Date,
  options: IDateFormat = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
): string => new Date(date).toLocaleDateString('en-US', options);
