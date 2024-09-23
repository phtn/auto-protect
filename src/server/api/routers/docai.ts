import { router } from "../trpc";
import { google } from "googleapis";
import { type JWT } from "google-auth-library";
import { env } from "@/env";
import { type RawDocument, RawDocumentSchema } from "@/server/api/schema/docai";
import { proc } from "../trpc";

export const docai_proc = proc.input(RawDocumentSchema);

const getAuthClient = () => {
  const serviceAccount = JSON.parse(env.ADC) as object;
  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });
  return auth.getClient() as Promise<JWT>;
};

const processDocument = async (client: JWT, rawDocument: RawDocument) => {
  const documentai = google.documentai({
    version: "v1",
    auth: client,
  });

  return await documentai.projects.locations.processors
    .process({
      name: `projects/${env.PROJECT_ID}/locations/${env.PROCESS_LOC}/processors/${env.PROCESS_ID}`,
      requestBody: {
        rawDocument,
      },
    })
    .then((response) =>
      response.data.document?.entities?.map(
        ({ type, mentionText, confidence }) => ({
          type,
          mentionText,
          confidence,
        }),
      ),
    )
    .catch((err: Error) => err);
};

export const docai_router = router({
  sendRequest: docai_proc.mutation(async ({ input }) => {
    const client = await getAuthClient();
    return await processDocument(client, input);
  }),
});
