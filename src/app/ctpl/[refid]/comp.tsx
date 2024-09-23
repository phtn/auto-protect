import Image from "next/image";
import { InputFieldName } from "@/ui/input";
import { type SpecialEntity } from "@/server/api/schema/docai";
import { ScanIcon } from "lucide-react";

export const ImageDisplay = (props: { imageData: string | null }) => {
  return (
    <div className="h-[450px] overflow-clip border">
      <Image
        alt="image to upload"
        src={props.imageData!}
        id="image-display"
        height={0}
        width={0}
        priority
        unoptimized
        className="h-auto w-full rounded border-[0.33px] border-gray-500/60"
      />
    </div>
  );
};

export const ScanResults = (props: { entities: SpecialEntity[] | null }) => {
  return (
    <div className="my-1 h-[510px] space-y-2 overflow-y-scroll px-2 pt-1">
      {props?.entities?.map((entity, index) => (
        <InputFieldName
          key={index}
          index={index}
          icon={ScanIcon}
          className="w-full"
          label={entity.type}
          defaultValue={entity.mentionText}
          type="text"
        />
      ))}
    </div>
  );
};
