const Title = ({ title }: { title: string }) => {
  return (
    <div className="text-xl font-ubuntu-500 self-start border-b-2 border-yellow2 ">
      {title}
    </div>
  );
};

export default Title;
