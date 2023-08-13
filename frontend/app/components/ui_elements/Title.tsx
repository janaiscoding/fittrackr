const Title = ({ title }: { title: string }) => {
  return (
    <div className="text-xl font-ubuntu-500 self-start border-b-2 border-secondary text-softWhite">
      {title}
    </div>
  );
};

export default Title;
