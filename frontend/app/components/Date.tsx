const { DateTime } = require("luxon");

const Date = ({ date }: { date: string }) => {
  return (
    <p className="text-white2 text-xs tracking-wider align-baseline">
      {DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)}{" "}
      - {" "}
      {DateTime.fromISO(date).toLocaleString(DateTime.TIME_SIMPLE)}
    </p>
  );
};

const JoinedDate = ({ date }: { date: string }) => {
  return (
    <p className="text-grey text-xs tracking-wider">
      Joined on{" "}
      {DateTime.fromISO(date).toLocaleString({
        day: "numeric",
        month: "long",
        year: "numeric",
      })}
    </p>
  );
};

export { Date, JoinedDate };
