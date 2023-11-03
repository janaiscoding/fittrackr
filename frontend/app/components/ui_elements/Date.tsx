import { formatDistanceToNow } from "date-fns";

const RelativeDate = ({ date }: { date: string }) => {
  return (
    <div className="text-white2 text-sm tracking-wider align-baseline">
      {formatDistanceToNow(new Date(date))} ago
    </div>
  );
};

const JoinedDate = ({ date }: { date: string }) => {
  return <p className="text-bgContainers text-xs tracking-wider"></p>;
};

export { RelativeDate, JoinedDate };
