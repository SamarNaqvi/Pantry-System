import * as dotenv from "dotenv";
dotenv.config();

import Image from "next/image";
import { Products } from "./components/products";

export default function Home() {
  return <Products />;
}
