'use client'
import React , { useState , useEffect } from 'react'

function page() {

  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    ProductCount();
  }, []);

  const ProductCount = () => {
    fetch("http://localhost:8000/countProducts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch product count");
        }
        return res.json();
      })
      .then((result) => {
        setProductCount(result.count);
      })
      .catch((error) => {
        console.error("Error fetching product count", error);
      });
  };
 
  return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div className="card w-96 bg-base-100 shadow-xl" style={{ marginTop: "10px" }}>
          <div className="card-body">
            <div className="card-actions justify-end"></div>
            <span>
              <p>Products Total</p>
              <p style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>{productCount}</p>
            </span>
          </div>
        </div>
        </div>
  );
}

export default page