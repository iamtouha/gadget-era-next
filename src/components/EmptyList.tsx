import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const EmptyProductsList = ({ caption }: { caption: string }) => {
  return (
    <div className="bg-neutral-100 py-6 text-center text-lg text-neutral-500/80 dark:bg-neutral-900 dark:text-neutral-600">
      <ExclamationTriangleIcon className="mx-auto h-12 w-12" />
      <p>{caption}</p>
    </div>
  );
};

export default EmptyProductsList;
