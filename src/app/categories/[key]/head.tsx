import { getCategory } from "@/utils/functions";

type Props = {
  params?: { key: string };
};
const CategoryHead = async ({ params }: Props) => {
  const category = await getCategory(params?.key ?? "");
  return (
    <>
      <title>{category.name} | Gadget Era</title>
      <meta name="description" content={category.cover} />
    </>
  );
};

export default CategoryHead;
