"use server";

import { api } from "trpc/server";
import { asyncFn } from "@/server/api/routers/utils";

export const sendRequest = asyncFn(api.docai.sendRequest);
