import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "~/utils/config";
import { db } from '~/server/db'
import { PinataSDK } from "pinata";


export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const { cid, id } = await pinata.upload.public.file(file)
    const url = await pinata.gateways.public.convert(cid);
    console.log(id);

    await db.gallery.create({
      data: {
        imageUrl: url,
        imageId:id
      }
    })
    
    return NextResponse.json(url, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageId = searchParams.get("imageId");
  const id = searchParams.get("id");

  const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT!,
    pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_UR!,
  });
  
  if (!imageId || !id) {
    return NextResponse.json({ error: "Image ID is required" }, { status: 400 });
  }

  const unpin = await pinata.files.public.delete([
    imageId
  ])
  await db.gallery.delete({
    where: {
      id: parseInt(id)
    }
  })
  return NextResponse.json({ message: "Image deleted" }, { status: 200 });

}


