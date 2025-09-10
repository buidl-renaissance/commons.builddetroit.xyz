export const convertToUTC = (estDateTime: string): Date => {
  // Create a date object from the EST datetime string
  const [datePart, timePart] = estDateTime.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);

  // Create date in EST timezone
  const estDate = new Date(year, month - 1, day, hours, minutes);

  // Convert to UTC for storage
  const utcDate = new Date(
    estDate.toLocaleString("en-US", { timeZone: "America/New_York" })
  );
  return utcDate;
};
