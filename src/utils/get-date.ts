import { Timestamp } from "firebase/firestore";

export const isTimestamp = (date: Timestamp | Date): date is Timestamp =>
  (date as Timestamp).toDate !== undefined;

export const getDate = (date: Timestamp | Date) => {
  if (isTimestamp(date)) {
    return date.toDate();
  } else {
    return Timestamp.fromDate(date);
  }
};
