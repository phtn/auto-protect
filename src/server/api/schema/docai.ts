import { z } from "zod";

export const SupportedFilesSchema = z.union([
  z.literal("pdf"),
  z.literal("gif"),
  z.literal("tiff"),
  z.literal("jpg"),
  z.literal("png"),
  z.literal("bmp"),
  z.literal("webp"),
]);
export type SupportedFiles = z.infer<typeof SupportedFilesSchema>;

export const MimeTypeSchema = z.union([
  z.literal("application/pdf"),
  z.literal("image/gif"),
  z.literal("image/tiff"),
  z.literal("image/jpeg"),
  z.literal("image/png"),
  z.literal("image/bmp"),
  z.literal("image/webp"),
]);

export type MimeType = z.infer<typeof MimeTypeSchema>;

export const RawDocumentSchema = z.object({
  mimeType: MimeTypeSchema,
  content: z.string(),
});

export type RawDocument = z.infer<typeof RawDocumentSchema>;

export const TextAnchorSchema = z.object({
  textSegments: z.array(
    z.object({
      startIndex: z.string().or(z.number()).or(z.undefined()),
      endIndex: z.string().or(z.number()).or(z.undefined()),
    }),
  ),
  content: z.string().or(z.null()).or(z.undefined()),
});
export type TextAnchor = z.infer<typeof TextAnchorSchema>;

export const OCRField = z.object({
  fieldName: z.string().or(z.undefined()),
  fieldValue: z.string().or(z.undefined()),
});

export type OCRFieldSchema = z.infer<typeof OCRField>;

const Vertex = z.object({
  x: z.number(),
  y: z.number(),
});

const BoundingBox = z.object({
  vertices: z.array(Vertex),
  normalizedVertices: z.array(Vertex),
});

const Layout = z.object({
  boundingBox: BoundingBox,
  textAnchor: TextAnchorSchema,
  confidence: z.number(),
  boundingPoly: BoundingBox,
  orientation: z.union([z.literal("PAGE_UP"), z.literal("PAGE_DOWN")]),
});

const DetectedLanguage = z.object({
  languageCode: z.string(),
});

const Token = z.object({
  layout: Layout,
  detectedLanguages: z.array(DetectedLanguage),
  text: z.string(),
});

const Line = z.object({
  layout: Layout,
  text: z.string(),
});

const Paragraph = z.object({
  layout: Layout,
  text: z.string(),
});

const Block = z.object({
  layout: Layout,
  text: z.string(),
});

const Page = z.object({
  pageNumber: z.number(),
  dimension: z.object({
    width: z.number(),
    height: z.number(),
    unit: z.string(),
  }),
  blocks: z.array(Block),
  paragraphs: z.array(Paragraph),
  lines: z.array(Line),
  tokens: z.array(Token),
});

const EntitiesSchema = z.object({
  type: z.string(),
  mentionText: z.string(),
  confidence: z.number(),
  textAnchor: TextAnchorSchema,
  pageAnchor: z.object({
    pageRefs: z.array(
      z.object({
        page: z.string(),
        boundingPoly: BoundingBox,
      }),
    ),
  }),
});

export type Entities = z.infer<typeof EntitiesSchema>;
export type SpecialEntity = Pick<
  Entities,
  "confidence" | "mentionText" | "type"
>;

export const DocumentAIResponseSchema = z.object({
  document: z.object({
    text: z.string(),
    pages: z.array(Page),
    entities: z.array(EntitiesSchema),
  }),
});

export type DocumentAIResponse = z.infer<typeof DocumentAIResponseSchema>;
