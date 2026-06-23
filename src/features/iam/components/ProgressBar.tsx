export const ProgressBar: React.FC<{
  current: number;
  total: number;
}> = ({ current, total }) => {
  const progressWidth = (current / total) * 100;
  return (
    <div className="w-1/2 h-2 bg-gray-600 rounded-full self-center">
      <div
        className="h-full bg-[#CBE220] rounded-full transition-all duration-500"
        style={{ width: `${progressWidth}%` }}
      ></div>
    </div>
  );
};
