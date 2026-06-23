export const formatTodayDate = (): string => {
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString("pt-BR", {
    weekday: "long",
  });
  const day = today.getDate();
  const month = today.toLocaleDateString("pt-BR", {
    month: "long",
  });

  return `${dayOfWeek.charAt(0) + dayOfWeek.slice(1)}, ${day} de ${month}`;
};

export const isDateThisWeek = (
  dateValue?: string | Date,
) => {
  if (!dateValue) return false;

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return false;

  const now = new Date();
  const startOfWeek = new Date(now);
  const day = startOfWeek.getDay();
  const diffToMonday = (day + 6) % 7;
  startOfWeek.setDate(startOfWeek.getDate() - diffToMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  return date >= startOfWeek && date < endOfWeek;
};
