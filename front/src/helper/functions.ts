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

export function formatDateTo_DD_MM_YYYY(date: Date) {
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = date.getFullYear();

  return mm + "/" + dd + "/" + yyyy;
}

export const getHours = () => {
  const hoursOfDayLabelArray = getNumbersArray(0, 24);
  return hoursOfDayLabelArray.map((number) => {
    return `${number.toString().length === 1 ? "0" + number : number}:00`;
  });
};

export function getPostsFromDay(posts: [] | [StrongW2iseType], day: Date) {
  return posts.filter((post) => {
    return (
      formatDateTo_DD_MM_YYYY(new Date(post.date)) ===
      formatDateTo_DD_MM_YYYY(day)
    );
  });
}

export const getDataPostPerHourFromDate = (
  posts: [] | [StrongW2iseType],
  date: Date
) => {
  let todaysPosts = getPostsFromDay(posts, date);

  let array = new Array(24).fill(0);
  todaysPosts.forEach((post) => {
    let index = new Date(post.date).getHours();
    array[index] += 1;
  });

  return array;
};

export function getNumbersArray(start: number, end: number) {
  const array = [];
  for (let i = start; i < end; i++) {
    array.push(i);
  }
  return array;
}
export function getSentimentalPostsByHourADay(
  posts: [] | [StrongW2iseType],
  day: Date
) {
  const postArray = getPostsFromDay(posts, day);

  let negativeArray = new Array(24).fill(0);
  let positiveArray = new Array(24).fill(0);
  let neutralArray = new Array(24).fill(0);
  postArray.forEach((post) => {
    let index = new Date(post.date).getHours();
    if (post.sentimentScore < 0) negativeArray[index] += 1;
    if (post.sentimentScore > 0) positiveArray[index] += 1;
    if (post.sentimentScore === 0) neutralArray[index] += 1;
  });

  return { negativeArray, positiveArray, neutralArray };
}

export function getSentimentScoreBar(posts: [] | [StrongW2iseType]) {
  let map: { [key: string]: number } = {};
  posts.forEach((post) => {
    if (map.hasOwnProperty(post.sentimentScore.toString())) {
      map[post.sentimentScore.toString()] += 1;
    } else {
      map[post.sentimentScore.toString()] = 1;
    }
  });
  let array: [{ x: number; y: number }] = [{ x: 0, y: 0 }];
  Object.keys(map).forEach((key) => {
    array.push({ x: parseInt(key), y: map[key] });
  });
  return array;
}

export function getSectionsPercentage(
  posts: [] | [StrongW2iseType],
  labels: string[]
) {
  let amountArray = new Array(labels.length).fill(0);
  posts.forEach((post) => {
    labels.forEach((label, i) => {
      if (post.section.toLowerCase() === label.toLowerCase()) {
        amountArray[i] += 1;
      }
    });
  });
  return amountArray;
}
