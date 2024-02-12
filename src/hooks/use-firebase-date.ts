import { useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";

const useFirebaseDate = (timestamp: Timestamp) => {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    setDate(timestamp.toDate().toDateString());
  }, []);

  return [date];
};

export default useFirebaseDate;
