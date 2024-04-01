'use client'
import Navbar from "./components/AdminNav/page";
import CardCount from "./components/ItemCount/page";
import ListProduct from "./components/ProductTable/page";

function Page() {
  return (
    <div>
      <Navbar />
      <CardCount />
      <div className="flex mx-auto">
      <ListProduct />
      </div>
    </div>
  );
}

export default Page;
