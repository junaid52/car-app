"use client";
import { useContext } from "react";
import { AssetsContext } from "@/context/assets-context";
export default function useAsset() {
  const { asset } = useContext(AssetsContext);
  return asset;
}
