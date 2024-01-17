import Footer from "@/components/store/footer";
import Navbar from "@/components/store/navbar";
import StoreModalProvider from "@/provider/store/store-modal-provider";
import { ToasterProvider } from "@/provider/toast-provider";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ! Authortion
  // const { userId } = auth();

  // if (!userId) {
  //   redirect("/sign-in")
  // }

  // const store = await prismadb.store.findFirst({
  //       where: {
  //           userId
  //       }
  //   })

  //   if (store) {
  //       redirect(`admin-cms/${store.id}`)
  //   }

  return (
    <>
    <StoreModalProvider />
    <ToasterProvider />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
