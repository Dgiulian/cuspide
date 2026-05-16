import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { getListingBySlug } from "@/services/get-listing-by-slug";
import { notFound } from "next/navigation";
import { BlockArrayContent } from "@/domain/property";
import sizeOf from "image-size";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ listingSlug: string }> }
) {
  const { listingSlug } = await params;

  try {
    if (!listingSlug) return notFound();

    // Fetch property details
    const property = await getListingBySlug(listingSlug);
    if (!property) return notFound();

    // Create a PDF document
    const doc = new PDFDocument({ margin: 50 });
    doc.font("Times-Roman");

    // Create a ReadableStream to stream the PDF
    const stream = new ReadableStream<Uint8Array>({
      start(controller: ReadableStreamDefaultController<Uint8Array>) {
        doc.on("data", (chunk: Buffer) =>
          controller.enqueue(new Uint8Array(chunk))
        );
        doc.on("end", () => controller.close());
        doc.on("error", (err: Error) => controller.error(err));
      },
    });

    // Add Title
    doc.fontSize(20).text(property.title ?? "", { align: "center" });
    doc.moveDown(1);

    // Add Description
    if (property.description) {
      doc
        .fontSize(12)
        .text(extractTextFromBlocks(property.description), { align: "left" });
      doc.moveDown(1);
    }

    // Add Images (if available)
    if (property.images?.length) {
      for (const imageUrl of property.images) {
        const imageBuffer = await fetchImageAsBuffer(imageUrl);
        if (imageBuffer) {
          const dimensions = sizeOf(imageBuffer);
          if (!dimensions.width || !dimensions.height) {
            console.error("Failed to get image dimensions:", imageUrl);
            continue;
          }

          const imageWidth = 500;
          const imageHeight =
            (dimensions.height / dimensions.width) * imageWidth;

          if (doc.y + imageHeight > doc.page.height - 50) {
            doc.addPage();
          }

          doc
            .image(imageBuffer, { width: imageWidth, height: imageHeight })
            .moveDown(imageHeight / 10);
        } else {
          doc.fontSize(10).text(`Failed to load image: ${imageUrl}`);
        }
      }
    } else {
      doc.text("No images available.");
    }

    doc.end();

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${listingSlug}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function fetchImageAsBuffer(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch image: ${url}`);
    const arrayBuffer = await res.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

function extractTextFromBlocks(blocks: BlockArrayContent): string {
  if (!blocks) return "";

  return blocks
    .map((block) => {
      if (!block.children) return "";

      const textContent = block.children
        .map((child) => child.text || "")
        .join(" ");

      switch (block.style) {
        case "h1":
          return `\n# ${textContent}\n`;
        case "h2":
          return `\n## ${textContent}\n`;
        case "h3":
          return `\n### ${textContent}\n`;
        case "h4":
          return `\n#### ${textContent}\n`;
        case "h5":
          return `\n##### ${textContent}\n`;
        case "h6":
          return `\n###### ${textContent}\n`;
        case "blockquote":
          return `\n> ${textContent}\n`;
        case "normal":
          return `• ${textContent}`;
        default:
          return textContent;
      }
    })
    .join("\n");
}
