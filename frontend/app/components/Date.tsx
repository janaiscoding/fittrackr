const { DateTime } = require("luxon");

const Date = ({ date }: { date: string }) => {
  return (
    <p className="text-grey text-xs tracking-wider">
      {DateTime.fromISO(date).toLocaleString({
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })}
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
