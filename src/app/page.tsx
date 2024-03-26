import { db } from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  return (
    await db.set('hello', 'hii')
  );
}
