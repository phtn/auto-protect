import { type DualIcon } from "@/app/types";
import { cn } from "@/utils/cn";
import { FolderOpenIcon } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;
export type IconName =
  | "user"
  | "name"
  | "file"
  | "reader"
  | "email"
  | "mobile"
  | "money"
  | "tokens"
  | "upload"
  | "password";

interface IconPrefix {
  name: IconName;
  icon: DualIcon;
}

export const InputFieldName = forwardRef<
  HTMLInputElement,
  InputProps &
    Omit<IconPrefix, "name"> & { label: string | undefined; index: number }
>(({ className, type, label, index, ...props }, ref) => {
  return (
    <div
      className={cn(
        "focus-within:ring-ring border-ash flex h-16 items-center rounded-xl border-[0.0px] bg-white pr-[3px] ring-offset-blue-400 focus-within:ring-1 focus-within:ring-offset-1 dark:bg-indigo-200/20",
        className,
      )}
    >
      <p className="text-clay/60 mx-4 text-xs">{index + 1}</p>
      <span className="text-clay w-64 text-xs font-medium uppercase leading-none">
        {label}
      </span>

      <input
        {...props}
        type={type}
        ref={ref}
        className="shadow-i-br-lg/80 border-ash bg-paper m-1 w-full rounded-lg border-0 p-3 font-mono text-[15px] uppercase tracking-widest text-zinc-600 placeholder:text-slate-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
});
InputFieldName.displayName = "InputFieldName";

export const InputFile = forwardRef<HTMLInputElement, InputProps & IconPrefix>(
  ({ className, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "focus-within:ring-ring border-ash flex w-[calc(100vw-56px)] flex-col items-center justify-center rounded-lg border border-dashed bg-white shadow-inner ring-offset-blue-400 focus-within:ring-1 focus-within:ring-offset-1 md:h-[200px] md:justify-end",
          className,
        )}
      >
        <div className="absolute flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            {/* <div className="size-[32px] bg-[url('/svg/sky-upload.svg')] bg-cover md:mr-[16px] md:size-[48px] portrait:size-[24px]" /> */}
            <div className="text-md">
              <p className="text-coal max-w-[20ch]">
                <span className="text-coal font-semibold">Click</span> here to
                select a file or{" "}
                <span className="text-coal font-semibold">drag and drop</span>{" "}
                it here.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 md:pb-2 md:pt-24">
            <span className="text-clay/80 text-xs italic">
              Supported formats:
            </span>

            <span className="text-clay py-1 text-[12px]">JPG, PNG or PDF</span>
          </div>
        </div>

        <input
          {...props}
          type={type}
          ref={ref}
          className="w-full text-[15px] opacity-0 placeholder:text-slate-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:h-[200px] md:py-3"
        />
      </div>
    );
  },
);
InputFile.displayName = "InputFile";

export const ImageFile = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative flex w-full cursor-pointer flex-col items-center justify-center px-4 portrait:justify-center",
          className,
        )}
      >
        <div className="h-[450px] w-full space-y-2 rounded-3xl bg-[#eeeeee] text-gray-500 shadow-md backdrop-blur-lg">
          <div className="shadow-inner/80 flex h-full w-full flex-col items-center justify-center rounded-b-3xl bg-white">
            <PhotoIcon className="size-24 stroke-[0.33px]" />
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-tighter">
              <p className="text-coal">Browse files</p>
              <FolderOpenIcon className="size-4 stroke-1" />
            </div>
          </div>
        </div>

        <input
          ref={ref}
          {...props}
          type={`file`}
          accept={`image/*,application/pdf`}
          className="absolute z-50 flex h-[400px] w-full overflow-hidden border bg-transparent text-[15px] opacity-0 placeholder:text-slate-400 focus-visible:outline-none md:w-[300px]"
        />
      </div>
    );
  },
);

ImageFile.displayName = "ImageFile";
