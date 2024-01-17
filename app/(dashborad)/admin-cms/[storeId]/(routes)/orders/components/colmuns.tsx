import { ColumnDef } from "@tanstack/react-table";

export type OrderColumn = {
  id: any;
  fullName: any;
  phone: any;
  email: any;
  address: any;
  zipCode: any;
  totalPrice: string;
  color: any;
  size: any;
  products: any;
  isPaid: any;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "zipCode",
    header: "Zip Code",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
];
