export const columns = ["Title", "price", "CreatedAt", "Edit"];

import { firestore } from "../../../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "../../api/uploadthing/core";

export interface Product {
  id: number;
  title: string;
  createdAt: string;
  price: number;
  imgSrc: string;
}

export const getProductNames = async () => {
  const snapshot = query(collection(firestore, "inventory-db"));
  const docs = await getDocs(snapshot);
  //@ts-ignore
  const inventoryList: Product[] = [];
  docs.forEach((doc) => {
    inventoryList.push(doc.data().title);
  });

  return inventoryList.join(" ");
};

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export const getProducts = () => [
  {
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/2015_Mazda_MX-5_ND_2.0_SKYACTIV-G_160_i-ELOOP_Rubinrot-Metallic_Vorderansicht.jpg/400px-2015_Mazda_MX-5_ND_2.0_SKYACTIV-G_160_i-ELOOP_Rubinrot-Metallic_Vorderansicht.jpg",
    title: "Mazda MX-5",
    price: 1989,
    createdAt: "12/1/1998",
  },
  {
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/VW_Kuebelwagen_1.jpg/400px-VW_Kuebelwagen_1.jpg",
    title: "Volkswagen Kübelwagen",
    price: 2000,
    createdAt: "12/1/1999",
  },
  {
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/2014_Porsche_Cayenne_%2892A_MY14%29_GTS_wagon_%282015-08-07%29_01.jpg/400px-2014_Porsche_Cayenne_%2892A_MY14%29_GTS_wagon_%282015-08-07%29_01.jpg",
    title: "Porsche Cayenne",
    price: 2002,
    createdAt: "12/1/2001",
  },
  {
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Vintage_car_at_the_Wirral_Bus_%26_Tram_Show_-_DSC03336.JPG/400px-Vintage_car_at_the_Wirral_Bus_%26_Tram_Show_-_DSC03336.JPG",
    title: "Vauxhall Chevette",
    price: 1975,
    createdAt: "12/1/1995",
  },
  {
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Dynamixion_car_by_Buckminster_Fuller_1933_%28side_views%29.jpg/400px-Dynamixion_car_by_Buckminster_Fuller_1933_%28side_views%29.jpg",
    title: "Dymaxion car",
    price: 1933,
    createdAt: "12/1/1997",
  },
  {
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Ford_Crown_Victoria_LX.jpg/400px-Ford_Crown_Victoria_LX.jpg",
    title: "Ford Crown Victoria",
    price: 1955,
    createdAt: "11/2/1998",
  },
  {
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Plymouth_Superbird.jpg/400px-Plymouth_Superbird.jpg",
    title: "Plymouth Superbird",
    price: 1970,
    createdAt: "12/1/2001",
  },
  {
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/2nd-Saab-9000-hatch.jpg/400px-2nd-Saab-9000-hatch.jpg",
    title: "Saab 9000",
    price: 1984,
    createdAt: "14/5/2001",
  },
  {
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/2003-2005_Pontiac_Sunfire.jpg/400px-2003-2005_Pontiac_Sunfire.jpg",
    title: "Pontiac Sunfire",
    price: 1994,
    createdAt: "12/1/1998",
  },
  {
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/1971_AMC_Javelin_SST_red_Kenosha_street.JPG/400px-1971_AMC_Javelin_SST_red_Kenosha_street.JPG",
    title: "AMC Javelin",
    price: 1967,
    createdAt: "12/1/1998",
  },
];
