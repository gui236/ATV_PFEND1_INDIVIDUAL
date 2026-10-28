import Image from "next/image";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { redirect } from "next/navigation";

export default function Home() {
   redirect("/eventos");
}
