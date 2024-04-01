"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/./Navbar/page";
import Breadcrumbs from "../../components/./Breadcrumbs/page";
import Carousel from "../../components/./Carousel/page";

function Page( id ) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProductGet();
  }, []);

  const ProductGet = () => {
    fetch("http://localhost:8000/selectProducts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((result) => {
        setProducts(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <Navbar />
      <Breadcrumbs />
      <Carousel />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          products?.map((row) => (
            <div
              key={row.id}
              className="card w-60 bg-base-100 shadow-xl m-4"
              style={{ flex: "0 0 calc(20% - 1rem)" }}
            >
              <figure className="px-10 pt-10">
                <img
                  src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">
                  {row.brand}
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>Color : {row.colorway}</p>
                <p>฿ {row.retail_price}</p>
                <div className="card-actions">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Page;
