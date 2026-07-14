import type { Metadata } from "next";
import { CatalystApp } from "./CatalystApp";

export const metadata: Metadata = {
  title: "Project Catalyst | FSI Executive Simulation",
  description: "A live executive simulation for leading Claude Code adoption across a financial institution.",
};

export default function Home() {
  return <CatalystApp />;
}
