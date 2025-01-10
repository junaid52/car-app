"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import useAsset from "@/hooks/use-asset";
export default function AssetsBanner() {
  const asset = useAsset();
  console.log(asset);
  return (
    <Card className="border-0 radius-[14px]">
      <CardHeader>
        <CardTitle>
          {asset.Year} {asset.modal}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[270px]">
          <Image
            src={asset.image}
            fill
            className="object-contain max-w-full"
          ></Image>
        </div>
      </CardContent>
    </Card>
  );
}
