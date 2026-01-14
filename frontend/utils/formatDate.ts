export const formatDate = (dateInput?: string | number): string => {
  if (!dateInput) return '';

  const timestamp = typeof dateInput === 'string' && !isNaN(Number(dateInput))
    ? Number(dateInput)
    : dateInput;

  const date = new Date(timestamp);

  // check if the date is valid
  if (isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};
