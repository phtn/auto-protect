"use client";

import dynamic from "next/dynamic";
import { type ThemeKeys } from "react-json-view";

const RJV = dynamic(() => import("react-json-view"), { ssr: false });

interface JsonProps {
  src: object;
  theme?: ThemeKeys;
}
export default function Json({ src, theme }: JsonProps) {
  return <RJV src={src} theme={theme ?? "rjv-default"} />;
}
