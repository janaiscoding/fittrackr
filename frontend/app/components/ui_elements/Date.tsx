import useDateFormatter from "../../hooks/useDateFormatter";

const RelativeDate = ({ date }: { date: string }) => {
  const dateForm = useDateFormatter(date);
  return (
    <div className="text-white2 text-xs tracking-wider align-baseline">
      {dateForm} ago
    </div>
  );
};

const JoinedDate = ({ date }: { date: string }) => {
  return <p className="text-bgContainers text-xs tracking-wider"></p>;
};

export { RelativeDate, JoinedDate };
