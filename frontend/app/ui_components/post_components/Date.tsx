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
export default Date;
