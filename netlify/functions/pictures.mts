import type { Config, Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

const tillatteFiltyper: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const lagNokkel = (contentType: string) => {
  const extension = tillatteFiltyper[contentType] || "bin";
  return `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
};

export default async (req: Request, context: Context) => {
  const store = getStore("pictures");
  const key = context.params.key;

  if (req.method === "POST") {
    const contentType = req.headers.get("content-type") || "";
    if (!tillatteFiltyper[contentType]) {
      return new Response("Only JPG, PNG or WEBP images are supported", { status: 400 });
    }

    const body = await req.arrayBuffer();
    const nyNokkel = lagNokkel(contentType);
    await store.set(nyNokkel, body, { metadata: { contentType } });

    return Response.json({ key: nyNokkel, url: `/api/pictures/${nyNokkel}` }, { status: 201 });
  }

  if (req.method === "GET") {
    if (!key) {
      const { blobs } = await store.list();
      return Response.json(blobs.map((blob) => blob.key));
    }

    const result = await store.getWithMetadata(key, { type: "arrayBuffer" });
    if (!result) {
      return new Response("Not found", { status: 404 });
    }

    const contentType = (result.metadata?.contentType as string) || "application/octet-stream";
    return new Response(result.data, { headers: { "content-type": contentType } });
  }

  if (req.method === "DELETE") {
    if (!key) {
      return new Response("Picture key is required", { status: 400 });
    }
    await store.delete(key);
    return new Response(null, { status: 204 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: ["/api/pictures", "/api/pictures/:key"],
};
