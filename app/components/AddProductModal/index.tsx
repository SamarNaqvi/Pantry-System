"use client";

import React, { useState } from "react";
import Modal from "../Modal";
import Input from "../Input";
import { UploadButton } from "../products/util";
import DatePicker from "react-datepicker";

function AddProduct({
  showModal,
  setShowModal,
  addProduct,
}: {
  showModal: Boolean;
  setShowModal: Function;
  addProduct: Function;
}) {
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCreation, setProductCreation] = useState(new Date());
  const [productImg, setProductImg] = useState("");

  const editProductLocal = () => {
    if (!productTitle || !productPrice || !productCreation || !productImg)
      return false;
    addProduct({
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
      title={"Add Product"}
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
        <div className="mt-5 relative mb-28">
          <UploadButton
            endpoint="imageUploader"
            className="absolute left-0"
            appearance={{
              button: {},
            }}
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
