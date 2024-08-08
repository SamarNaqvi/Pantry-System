"use client";

import styles from "./index.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product, columns, getProductNames, getProducts } from "./util";
import { EditIcon, DeleteIcon } from "Icons/index.js";
import AddProduct from "components/AddProductModal";
import EditProduct from "components/EditProductModal";
import { firestore } from "../../../firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import SearchBar from "components/SearchBar";
import { getOpenAIResponse } from "../../../magixbox";

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchField, setSearchField] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    title: "",
    id: 0,
    price: 0,
    createdAt: "",
    imgSrc: "",
  });
  const [gptResp, setGptResp] = useState("");

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory-db"));
    const docs = await getDocs(snapshot);
    //@ts-ignore
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ ...doc.data() });
    });
    // @ts-ignore
    setProducts(inventoryList);
  };

  const addItem = async (item: any) => {
    if (!item?.id) return;
    const docRef = doc(
      collection(firestore, "inventory-db"),
      `product-${item.id.toString()}`
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await setDoc(docRef, { ...item });
    } else {
      await setDoc(docRef, { ...item });
    }
    await updateInventory();
  };

  const removeItem = async (item: any) => {
    if (!item?.id) return;
    const docRef = doc(
      collection(firestore, "inventory-db"),
      `product-${item.id.toString()}`
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await deleteDoc(docRef);
    }
    await updateInventory();
  };

  const chatGptResp = async () => {
    const prodNames = await getProductNames();
    getOpenAIResponse(prodNames).then((resp) => {
      //setGptResp(resp);
    });
  };

  useEffect(() => {
    //chatGptResp();
    updateInventory();
  }, []);

  const editProductHandler = (id: number) => {
    const prod = products.filter((product) => product.id === id);
    setShowEditModal(true);

    setCurrentProduct(prod[0]);
    addItem(prod);
  };
  const removeProduct = (id: number) => {
    const prod = products.filter((prod) => prod.id === id)[0];
    setProducts(products.filter((prod) => prod.id !== id));
    removeItem(prod);
  };
  const addProductHandler = (prod: any) => {
    const prodUpdated = {
      id: prod?.id ?? products.length + 1,
      title: prod.title,
      price: parseInt(prod.price),
      createdAt: prod.createdAt,
      imgSrc: prod.imgSrc,
    };
    //@ts-ignore
    setProducts([...products, { ...prodUpdated }]);
    addItem(prodUpdated);
    return true;
  };

  const editProductHandlerWrapper = (prod: any) => {
    //@ts-ignore
    const filteredProds = products.filter((product) => product.id !== prod.id);

    const newProds = [...filteredProds, { ...prod }];
    //@ts-ignore
    setProducts(newProds);
    addItem(prod);
    return true;
  };

  const filteredProds = searchField
    ? products.filter((prod) => prod.title.toLowerCase().includes(searchField))
    : products;
  return (
    <>
      <div className="flex mb-6 -gap-2">
        <div className="flex items-center space-x-4 justify-self-start">
          <svg
            width="40"
            height="40"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="100"
              cy="100"
              r="95"
              stroke="#6C757D"
              stroke-width="10"
              fill="none"
            />

            <rect
              x="50"
              y="70"
              width="100"
              height="60"
              fill="#007BFF"
              stroke="#6C757D"
              stroke-width="5"
            />
            <line
              x1="50"
              y1="70"
              x2="100"
              y2="30"
              stroke="#6C757D"
              stroke-width="5"
            />
            <line
              x1="150"
              y1="70"
              x2="100"
              y2="30"
              stroke="#6C757D"
              stroke-width="5"
            />

            <line
              x1="80"
              y1="130"
              x2="80"
              y2="160"
              stroke="#6C757D"
              stroke-width="5"
            />
            <line
              x1="120"
              y1="130"
              x2="120"
              y2="160"
              stroke="#6C757D"
              stroke-width="5"
            />
            <circle cx="80" cy="170" r="5" fill="#007BFF" />
            <circle cx="120" cy="170" r="5" fill="#007BFF" />
          </svg>

          <span className={`${styles.logotext} text-gray-800`}>
            Pantry System
          </span>
        </div>
        <div className="ml-auto flex">
          <SearchBar
            searchField={searchField}
            setSearchField={setSearchField}
          />
          <button
            onClick={() => {
              setShowModal(!showModal);
            }}
            className="flex items-center bg-blue-500 text-white font-bold px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-150"
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 5v14m7-7H5" />
            </svg>
            Add Product
          </button>
        </div>
      </div>
      {showModal && (
        <AddProduct
          showModal={showModal}
          setShowModal={setShowModal}
          addProduct={(prod: any) => addProductHandler(prod)}
        />
      )}
      {showEditModal && (
        <EditProduct
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          product={currentProduct}
          editProduct={(prod: any) => editProductHandlerWrapper(prod)}
        />
      )}

      <div className="bg-slate-50 rounded p-2 font-normal text-center table-fixed w-full max-h-[40rem] overflow-y-scroll">
        <table className={`${styles.table} w-full`}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-5 pt-5 pb-2 font-bold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="h-10 overflow-y-scroll">
            {filteredProds.map((product) => (
              <tr key={product.id}>
                <td className="flex items-center gap-x-2">
                  {product.imgSrc && (
                    <Image
                      className="rounded"
                      alt="product img"
                      height={100}
                      width={90}
                      src={product.imgSrc}
                    />
                  )}
                  {product.title}
                </td>
                <td>{product.price}</td>
                <td>{product.createdAt}</td>
                <td>
                  <div className="flex items-center justify-center gap-x-2">
                    <EditIcon onClick={() => editProductHandler(product.id)} />
                    <DeleteIcon onClick={() => removeProduct(product.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
