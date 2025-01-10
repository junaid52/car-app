import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AssetNote from "./asset-note";
const data = [
  {
    id: "1",
    noteType: "1",
    date: "Monday, 6th April 2020",
    noteContent: "Book for General Service",
    status: "completed",
  },
  {
    id: "2",
    noteType: "2",
    date: "Thursday, 24th October 2021",
    noteContent: "Vehicle LV 001 has been marked for recall.",
    status: "14:07-21/11/2021",
  },
  {
    id: "3",
    noteType: "3",
    date: "Monday, 13th August 2018",
    noteContent: "Maintenance Completed, Collect",
    status: "14:07-21/11/2021",
  },
];
export default function AssetNotes() {
  return (
    <Card className="border-0 rounded-[14px]">
      <CardHeader>
        <CardTitle>Notes</CardTitle>
      </CardHeader>
      <CardContent>
        {data.map((element) => {
          return <AssetNote key={element.id} {...element} />;
        })}
      </CardContent>
    </Card>
  );
}
