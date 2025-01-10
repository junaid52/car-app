"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import carImage from "@/assets/images/car.png";
import useAsset from "@/hooks/use-asset";
function AssetDetailsWithSeparator({ data1, data2 }) {
  return (
    <div className="flex mb-4">
      <div className="w-[33.3333%]">
        <h5 className="text-secondary-blue-200 font-medium">{data1.title}</h5>
        <h3 className="text-white">{data1.value}</h3>
      </div>
      <div className="flex justify-center w-[33.3333%]">
        <Separator className="bg-secondary-blue-100" orientation="vertical" />
      </div>

      <div className="w-[33.3333%]">
        <h5 className="text-secondary-blue-200 font-medium">{data2.title}</h5>
        <h3 className="text-white">{data2.value}</h3>
      </div>
    </div>
  );
}
export default function AssetsSidebar() {
  const asset = useAsset();
  const data = [
    [
      {
        title: "Fuel Usage",
        value: asset.fuelUsage,
      },
      {
        title: "Driver",
        value: asset.Driver,
      },
    ],
    [
      {
        title: "Price",
        value: asset.Price,
      },
      {
        title: "Top Speed",
        value: asset.topSpeed,
      },
    ],
  ];
  return (
    <Card className="w-[360px] h-[674px] p-8 bg-secondary-blue-400">
      <CardContent className="p-0">
        {data.map((item, index) => {
          return <AssetDetailsWithSeparator data1={item[0]} data2={item[1]} />;
        })}
        <div className="relative top[40px]">
          <Image src={carImage} alt="car picture"></Image>
        </div>
      </CardContent>
    </Card>
  );
}
