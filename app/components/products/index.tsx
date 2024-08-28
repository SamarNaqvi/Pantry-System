"use client";

import styles from "./index.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product, columns, getProducts } from "./util";
import {
  EditIcon,
  DeleteIcon,
  ChatBotIcon,
  AddProductIcon,
} from "Icons/index.js";
import AddProduct from "components/AddProductModal";
import EditProduct from "components/EditProductModal";
import { firestore } from "../../../firebase";
import Link from "next/link";
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

  useEffect(() => {
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
          <span className={`${styles.logotext} text-slate-100`}>
            PANTRY SYSTEM
          </span>
        </div>
        <div className="ml-auto flex gap-x-2">
          <SearchBar
            searchField={searchField}
            setSearchField={setSearchField}
          />
          <button
            onClick={() => {
              setShowModal(!showModal);
            }}
            className="flex items-center bg-slate-900 text-slate-100 font-bold px-4 rounded hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-150"
          >
            <AddProductIcon />
            Add Product
          </button>
          <Link
            href="/ask-ai"
            className="flex items-center bg-slate-900 text-slate-100 font-bold px-6 rounded hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-150"
          >
            <ChatBotIcon />
            Chat Bot
          </Link>
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

      <div className="bg-gray-700 rounded font-normal text-center table-fixed w-full max-h-[40rem] overflow-y-scroll">
        <table className={`${styles.table} w-full`}>
          <thead className=" top-0 sticky z-20 bg-slate-900">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-5 pt-5 pb-2 font-bold text-slate-50"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">
            {filteredProds.map((product) => (
              <tr key={product.id} className="max-h-4">
                <td className="flex items-center gap-x-2">
                  {product.imgSrc && (
                    <Image
                      className="rounded max-h-12"
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
