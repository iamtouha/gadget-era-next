import { ArrowPathIcon } from "@heroicons/react/24/solid";

const Loading = () => {
  return (
    <div className="flex items-center justify-center py-32">
      <ArrowPathIcon className="mr-1 h-6 w-6 animate-spin" />
      <span className="font-medium">Loading...</span>
    </div>
  );
};

export default Loading;
