import { MessageCircle, CircleAlert, Wrench } from "lucide-react";
import Circle from "@/components/circle";
export default function AssetNote(props) {
  let Icon;
  if (props.noteType === "1") {
    Icon = <MessageCircle size={20} />;
  } else if (props.noteType === "2") {
    Icon = <CircleAlert size={20} className="text-secondary-red" />;
  } else {
    Icon = <Wrench size={20} />;
  }
  return (
    <div className="flex gap-4 mb-4">
      <div>
        <Circle>{Icon}</Circle>
      </div>
      <div>
        <h5 className="font-medium">{props.date}</h5>
        <p className="text-[#A9B1BC] text-sm">{props.noteContent}</p>
      </div>
    </div>
  );
}
