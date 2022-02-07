export function formatDate(date: string): { date?: string; error?: string } {
  try {
    return {
      date: new Date(date)
        .toISOString()
        .replace(/T/, " ") // replace T with a space
        .replace(/\..+/, ""),
    };
  } catch (error) {
    return { error: "Could not parse date" };
  }
}
