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

export function isDataType(data: any): data is dataType {
  if (data) {
    if (Array.isArray(data)) {
      if (data.length === 0) {
        return true;
      }
      if (
        data.length > 0 &&
        data[0].hasOwnProperty("date") &&
        data[0].hasOwnProperty("author")
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
  return false;
}

export function isString(str: any): str is string {
  return typeof str === "string";
}
