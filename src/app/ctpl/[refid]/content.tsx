"use client";

import { cn } from "@/utils/cn";
import { opts } from "@/utils/helpers";
import { CircleIcon, XIcon } from "lucide-react";
import { useCallback, type ChangeEvent, type FormEvent } from "react";
import { ImageDisplay } from "./comp";
import { ImageFile } from "@/ui/input";
import { useDocumentAI } from "./hook";
import { useFile } from "./hook";
import { ScanResults } from "./comp";
import { Button, Chip } from "@nextui-org/react";
import { DarkTouch } from "@/ui/touch";
import { CheckIcon } from "@heroicons/react/24/outline";

export const CTPLContent = (props: { refid: string | undefined }) => (
  <div
    className={cn(
      `h-[calc(100vh-72px)] bg-gradient-to-tr from-orange-200/30 via-[#fafafa] to-[#fcfcfc] ${props.refid}`,
    )}
  >
    <DocumentReader />
  </div>
);

export const DocumentReader = () => {
  const { getFile, imageData, rawDocument, removeFile, fmt, fsize } = useFile();

  const { handleSendRequest, loading, result, elapsed } = useDocumentAI();

  const submitRequest = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!rawDocument) {
      return;
    }
    handleSendRequest(rawDocument);
  };

  const ImageViewer = useCallback(() => {
    const withContentData = rawDocument !== null;
    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        await getFile(e.target.files[0]);
      }
    };
    const options = opts(
      <ImageDisplay imageData={imageData} />,
      <ImageFile onChange={handleChange} />,
    );

    return <>{options.get(withContentData)}</>;
  }, [rawDocument, getFile, imageData]);

  const FormViewer = useCallback(() => {
    const options = opts(<ScanResults entities={result} />, <FormCover />);
    return <>{options.get(result !== null)}</>;
  }, [result]);

  return (
    <>
      <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
        <div className="flex w-full flex-col items-center space-y-2 px-6 py-4">
          <div className="flex w-full flex-col justify-start p-6 font-ibm tracking-tighter">
            <p className="text-3xl">
              We do things fast and easy. So should you.
            </p>
            <p className="text-sm">
              Try our document reader for free. Simply upload your Certificate
              of Registration and hit scan.
            </p>
          </div>
          <div className="h-[56px] w-full px-4">
            <div className="flex h-full w-full items-center justify-between rounded-t-xl bg-void backdrop-blur-3xl">
              <div className="px-4">
                <CircleIcon className="size-5 text-gray-400 drop-shadow-md" />
              </div>
              <ScanMetrics length={result?.length} elapsed={elapsed} />
              <Button
                variant="bordered"
                isIconOnly
                className="flex h-[50px] w-fit items-center justify-center rounded-full border-0 px-6"
                onClick={removeFile}
              >
                <XIcon
                  className={cn(
                    "size-5 shrink-0 text-gray-400 drop-shadow-sm",
                    { hidden: !rawDocument },
                  )}
                />
              </Button>
            </div>
          </div>
          <ImageViewer />
          <div className="flex h-[80px] w-full items-center justify-between space-x-4 px-4">
            <div className="flex items-center space-x-4">
              <div>
                <FileType type={fmt} />
              </div>
              <div>
                <FileSize size={fsize} />
              </div>
            </div>
            <DarkTouch
              size={"lg"}
              onClick={submitRequest}
              className=""
              disabled={loading && !rawDocument}
            >
              <p>{loading ? `Scanning` : `Scan Document`}</p>
            </DarkTouch>
          </div>
        </div>

        <div className="h-[calc(100vh-72px)] bg-white">
          <div className={cn(`h-full space-y-4 p-4`)}>
            <FormViewer />
          </div>
        </div>
      </div>

      <div className="hidden space-y-4 p-4">
        <canvas
          id="grayscale-canvas"
          className="hidden h-auto w-full transition-transform duration-500 hover:scale-[180%]"
        />
      </div>
    </>
  );
};

const FileType = (props: { type: string | undefined }) => (
  <Chip
    startContent={<CheckIcon className="size-4 text-white" />}
    variant="shadow"
    color="primary"
    className={cn(
      "animate-enter font-arc text-xs font-semibold uppercase tracking-tight delay-500",
      {
        hidden: !props.type,
      },
    )}
  >
    {props.type}
  </Chip>
);

const FileSize = (props: { size: number | undefined }) => (
  <Chip
    startContent={<CheckIcon className="size-4 text-white" />}
    variant="shadow"
    color="primary"
    className={cn(
      "animate-enter font-arc text-xs font-medium tracking-tight delay-300",
      {
        hidden: !props.size,
      },
    )}
  >
    {props.size?.toFixed(2)}Mb
  </Chip>
);

const ScanMetrics = (props: {
  length: number | undefined;
  elapsed: number;
}) => {
  return (
    <div
      className={cn(
        `flex h-[54px] w-full items-center justify-end space-x-6 px-2 text-xs leading-none`,
        !props.length ? `hidden` : ``,
      )}
    >
      <div className="flex h-[54px] flex-col items-center justify-center rounded-lg bg-white px-3">
        <p className="text-sm font-medium">{props.length}</p>
        <p className="text-[9px] uppercase"> items</p>
      </div>
      <div className="flex h-[54px] flex-col items-center justify-center rounded-lg bg-white px-3">
        <p className="text-sm font-medium">{props.elapsed.toFixed(1)}s</p>
        <p className="text-[9px] uppercase">elapsed</p>
      </div>
    </div>
  );
};

const FormCover = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      View Form
    </div>
  );
};
