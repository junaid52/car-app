"use client";
import { useContext } from "react";
import { AssetsContext } from "@/context/assets-context";
export default function useAssets() {
  const { assets, handleAsset } = useContext(AssetsContext);
  return { assets, handleAsset };
}
