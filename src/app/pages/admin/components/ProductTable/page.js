'use client'
import React, { useState, useEffect } from "react";

function Page() {
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [brand, setBrand] = useState('');
  const [colorway, setColorway] = useState('');
  const [release_date, setReleaseDate] = useState('');
  const [retail_price, setRetailPrice] = useState('');

  useEffect(() => {
    ListProduct();
  }, []);

  const ListProduct = () => {
    fetch("http://localhost:8000/selectProducts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch list of products");
        }
        return res.json();
      })
      .then((result) => {
        setListProduct(result);
        setLoading(false);
        setDeleteSuccess(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const openDeleteDialog = (product) => {
    setDeleteProduct(product);
    document.getElementById("my_modal_1").showModal();
  };

  const closeDeleteDialog = () => {
    document.getElementById("my_modal_1").close();
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/deleteProduct?id=${id}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete product");
        }
        return res.json();
      })
      .then(() => {
        ListProduct();
        setDeleteSuccess(true);
        closeDeleteDialog();
      })
      .catch((error) => {
        setError(error);
      });
  }

  const openEditDialog = (product) => {
    setEditProduct(product);
    setBrand(product.brand);
    setColorway(product.colorway);
    setReleaseDate(product.release_date);
    setRetailPrice(product.retail_price);
    document.getElementById("my_modal_2").showModal();
  };

  const closeEditDialog = () => {
    setEditProduct(null);
    document.getElementById("my_modal_2").close();
  };

  const handleEdit = (event) => {
    event.preventDefault();
    const data = {
      'id': editProduct.id,
      'brand': brand,
      'colorway': colorway,
      'release_date': release_date,
      'retail_price': retail_price,
    };
    fetch('http://localhost:8000/updateProduct', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(
        (result) => {
          alert(result['message']);
          if (result['status'] === 'ok') {
            ListProduct();
            closeEditDialog();
          }
        }
      )
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div className="mx-auto justify-center">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="overflow-x-auto">
          {deleteSuccess && (
            <div className="alert alert-success">
              <span>Delete product successfully</span>
            </div>
          )}
          <table className="table" style={{ width: "95vw" }}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Brand</th>
                <th>Color</th>
                <th>Release Date</th>
                <th>Price ฿</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {listProduct.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.brand}</td>
                  <td>{product.colorway}</td>
                  <td>{product.release_date}</td>
                  <td>{product.retail_price}</td>
                  <td className="flex mx-auto p-3">
                    <button
                      className="btn btn-ghost btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                      onClick={() => openEditDialog(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-ghost btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                      onClick={() => openDeleteDialog(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          {deleteProduct && (
            <>
              <h3 className="font-bold text-lg">Do you want to delete this product?</h3>
              <p className="py-4">
                This product would be deleted. If you don't want to delete, please click Cancel!
              </p>
              <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => handleDelete(deleteProduct.id)}>Yes</button>
                <button className="btn btn-ghost" onClick={() => document.getElementById("my_modal_1").close()}>Cancel</button>
              </div>
            </>
          )}
        </div>
      </dialog>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Product</h3>
          <form onSubmit={handleEdit}>
            <div className="input-group">
              <label className="input input-bordered flex items-center gap-2">
                Brand
                <input type="text" className="grow" placeholder="Nike"
                  value={brand} onChange={(e) => setBrand(e.target.value)} required />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Color
                <input type="text" className="grow" placeholder="Black"
                  value={colorway} onChange={(e) => setColorway(e.target.value)} required />
              </label>
            </div>
            <div className="input-group">
              <label className="input input-bordered flex items-center gap-2">
                Release Date
                <input type="text" className="grow" placeholder="Date"
                  value={release_date} onChange={(e) => setReleaseDate(e.target.value)} required />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Price
                <input type="text" className="grow" placeholder="Date"
                  value={retail_price} onChange={(e) => setRetailPrice(e.target.value)} required />
              </label>
            </div>
            <div className="mx-auto flex justify-center mt-4">
              <button type="submit" className="btn btn-ghost mr-2">Save</button>
              <button type="button" className="btn btn-ghost" onClick={closeEditDialog}>Cancel</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Page;
