import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("image") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const imgbbData = new FormData();
    imgbbData.append("image", file);
    
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
      method: "POST",
      body: imgbbData,
    });

    const result = await response.json();

    if (!result.success) {
      return NextResponse.json({ error: result.error?.message || "Upload failed" }, { status: 500 });
    }

    return NextResponse.json({ url: result.data.url });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}