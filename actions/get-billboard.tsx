import { Billboard } from "@/types";

const URL=`https://cms-9lh8.onrender.com/api/billboards`;

const getBillboard = async (id: string): Promise<Billboard> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getBillboard;
