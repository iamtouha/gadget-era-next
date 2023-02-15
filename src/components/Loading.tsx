import { ArrowPathIcon } from "@heroicons/react/24/solid";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <ArrowPathIcon className="mr-1 h-6 w-6 animate-spin" />
      <span className="font-medium">Loading...</span>
    </div>
  );
};

export default Loading;
