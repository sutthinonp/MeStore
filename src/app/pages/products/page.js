'use client'
import React, { useState } from "react";
import Navbar from "../admin/components/AdminNav/page";

function Page() {

  const [brand, setBrand] = useState('');
  const [colorway, setColorway] = useState('');
  const [release_date, setDate] = useState('');
  const [retail_price, setPrice] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const data = {
      'brand': brand,
      'colorway': colorway,
      'release_date': release_date,
      'retail_price': retail_price,
    }
    fetch('http://localhost:8000/product', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result['status'] === 'ok') {
        }
      }
    )
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="card w-full p-6 bg-base-100 shadow-xl mt-6">
          <div className="card-body">
            <h2 className="card-title justify-center">Add Products</h2>
            <div className="divider mt-2"></div>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Brand Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Enter brand name"
                  required
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Color</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={colorway}
                  onChange={(e) => setColorway(e.target.value)}
                  placeholder="Enter product color"
                  required
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={retail_price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter product price"
                  required
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Release Date</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered"
                  value={release_date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="card-actions justify-center mt-6">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
