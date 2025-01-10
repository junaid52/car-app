"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useAssets from "@/hooks/use-assets";
export default function AvailableAssets() {
  const { assets, handleAsset } = useAssets();
  const [option, setOption] = useState(assets[0].modal);
  useEffect(() => {
    const findedOption = assets.find((asset) => asset.modal === option);
    handleAsset(findedOption);
  }, [option, handleAsset]);
  return (
    <Card className="border-0 rounded-[14px]">
      <CardHeader>
        <CardTitle>Available Cars</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <RadioGroup
            name="car"
            value={option}
            onValueChange={(param) => {
              setOption(param);
            }}
          >
            {assets.map((element) => {
              return (
                <div
                  key={element.modal}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem
                    value={element.modal}
                    id={element.modal}
                  ></RadioGroupItem>
                  <Label htmlFor={element.modal}>{element.modal}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </form>
      </CardContent>
    </Card>
  );
}
