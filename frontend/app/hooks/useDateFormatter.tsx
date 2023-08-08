import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

// Translates a date from the database (ISO 8601) to time relative to now: 'mins/hrs/days etc ago'
const useDateFormatter = (date: string) => {
  const [format, setFormat] = useState<string>();

  useEffect(() => {
    const dbTime = new Date(date);
    setFormat(formatDistanceToNow(dbTime));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return format;
};

export default useDateFormatter;
