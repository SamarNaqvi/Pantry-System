"use client";

import React, { useState } from "react";
import Modal from "../Modal";
import Input from "../Input";
import { UploadButton } from "../products/util";

function AddProduct({
  showModal,
  setShowModal,
  editProduct,
  product,
}: {
  showModal: Boolean;
  setShowModal: Function;
  editProduct: Function;
  product: {
    title: string;
    id: number;
    price: number;
    createdAt: string;
    imgSrc: string;
  };
}) {
  const [productTitle, setProductTitle] = useState(product.title);
  const [productPrice, setProductPrice] = useState(product.price.toString());
  const [productCreation, setProductCreation] = useState(product.createdAt);
  const [productImg, setProductImg] = useState(product.imgSrc);

  const editProductLocal = () => {
    if (!productTitle || !productPrice || !productCreation) return false;
    editProduct({
      ...product,
      title: productTitle,
      price: productPrice,
      createdAt: productCreation,
      imgSrc: productImg,
    });
    return true;
  };
  return (
    <Modal
      setShowModal={setShowModal}
      showModal={showModal}
      title={"Edit Product"}
      onsubmit={editProductLocal}
    >
      <div>
        <Input
          className="mt-5"
          value={productTitle}
          onChange={(e) => setProductTitle(e.target.value)}
          id="name"
          type="text"
          label="Title"
          placeholder="Enter Product Name"
        />
        <Input
          className="mt-5"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          id="price"
          type="text"
          label="Price"
          placeholder="Enter Product Price"
        />
        <Input
          className="mt-5"
          id="creation"
          value={productCreation}
          onChange={(e) => setProductCreation(e.target.value)}
          type="text"
          label="Created At"
          placeholder="Enter Product Creation Date"
        />
        <div className="mt-5 relative mb-28">
          <UploadButton
            endpoint="imageUploader"
            className="absolute left-0"
            onClientUploadComplete={(res) => {
              // Do something with the response
              setProductImg(res[0].url);
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AddProduct;
