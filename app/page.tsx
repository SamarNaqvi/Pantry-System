import * as dotenv from "dotenv";
dotenv.config();

import Image from "next/image";
import { Products } from "./components/products";

export default function Home() {
  return (
    <div className="p-10 bg-slate-300" style={{ height: "100vh" }}>
      <Products />
    </div>
  );
}
