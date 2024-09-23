import { NextUIProvider } from "@nextui-org/react";
import { type PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
