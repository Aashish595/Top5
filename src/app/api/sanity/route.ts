// src/app/api/sanity/route.js
import { client } from "@/lib/sanity/client";

// src/app/api/sanity/route.js
import { revalidatePath } from 'next/cache'; // only for Next 13/14 app directory

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const slug = body.slug || "/";

    // Revalidate home or specific page
    revalidatePath(slug);
    return Response.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return Response.json({ error: "Failed to revalidate" }, { status: 500 });
  }
}


export async function GET() {
  try {
    const data = await client.fetch(`*[_type == "category"]{title, slug}`);
    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ success: false }, { status: 500 });
  }
}
