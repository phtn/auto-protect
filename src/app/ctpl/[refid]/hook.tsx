import { SupportedFilesSchema } from "@/server/api/schema/docai";
import { fileType, errHandler } from "@/utils/helpers";
import { type FormEvent, useState } from "react";

import type {
  SpecialEntity,
  RawDocument,
  MimeType,
} from "@/server/api/schema/docai";
import { sendRequest } from "@/lib/paymongo/docai/process";

export const useFile = () => {
  const [validFormat, setValidFormat] = useState(false);
  const [validSize, setValidSize] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);
  const [rawDocument, setRawDocument] = useState<RawDocument | null>(null);
  const [fmt, setFmt] = useState<string>();
  const [fsize, setFSize] = useState<number>();

  const readFile = (file: File): Promise<string> =>
    new Promise((resolve) => {
      setValidFormat(fileType(file.type) in SupportedFilesSchema);
      setFmt(fileType(file.type));

      const fileSize = file.size / 1000000;
      setFSize(fileSize);

      const isValidSize = fileSize < 10;
      setValidSize(isValidSize);
      if (!isValidSize) {
        console.error("Invalid File Size.", `Use files below 10MB.`);
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        // Display original image
        const image = e.target?.result?.toString();
        setImageData(image!);

        // Create new image
        const img = new Image();
        img.onload = () => {
          const canvas = document.getElementById(
            "grayscale-canvas",
          ) as HTMLCanvasElement;
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            console.error("Unable to get 2D context");
            return;
          }

          // Calculate new dimensions
          const dw = img.width * 0.4;
          const dh = img.height * 0.42;

          canvas.width = dw;
          canvas.height = dh;

          // Draw resized image
          ctx.drawImage(img, 0, 0, dw, dh);

          // Convert to grayscale
          const grayData = grayscale(ctx, dw, dh);

          ctx.putImageData(grayData, 0, 0);

          // console.log(canvas.toDataURL("image/webp"), dh, dw);

          // Set processed images
          const content = canvas.toDataURL("image/webp").split(",")[1]!;
          const mimeType = "image/webp" as MimeType;
          setRawDocument({ content, mimeType });
        };

        img.src = e.target?.result as string;

        resolve(img.src);
      };
      reader.readAsDataURL(file);
    });

  const getFile = (file: File) =>
    readFile(file)
      .then((data) => setImageData(data))
      .catch(errHandler);

  const removeFile = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRawDocument(null);
    setFmt(undefined);
    setFSize(undefined);
  };

  return {
    readFile,
    removeFile,
    getFile,
    rawDocument,
    imageData,
    validFormat,
    validSize,
    fmt,
    fsize,
  };
};

const grayscale = (ctx: CanvasRenderingContext2D, sw: number, sh: number) => {
  const imageData = ctx.getImageData(0, 0, sw, sh);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i]! + data[i + 1]! + data[i + 2]!) / 3;
    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }
  return imageData;
};

export const useDocumentAI = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SpecialEntity[] | null>(null);
  const [elapsed, setElapsed] = useState(0);

  let startTime: number;
  let endTime: number;
  const handleSendRequest = (rawDocument: RawDocument) => {
    startTime = Date.now();
    setLoading(true);
    sendRequest(rawDocument)
      .then((response) => {
        setResult(response as SpecialEntity[]);
        endTime = Date.now();
        setElapsed((endTime - startTime) / 1000);
        setLoading(false);
      })
      .catch(errHandler(setLoading));
  };

  return { handleSendRequest, loading, result, elapsed };
};
