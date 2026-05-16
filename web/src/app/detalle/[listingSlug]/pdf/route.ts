import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { getListingBySlug } from "@/services/get-listing-by-slug";
import { notFound } from "next/navigation";
import { BlockArrayContent } from "@/domain/property";
import sizeOf from "image-size"; // Library to get image dimensions

export async function GET(
  request: NextRequest,
  { params }: { params: { listingSlug: string } }
) {
  const { listingSlug } = params;

  try {
    if (!listingSlug) return notFound();

    // Fetch property details
    const property = await getListingBySlug(listingSlug);
    if (!property) return notFound();

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Create a PDF document
    const doc = new PDFDocument({ margin: 50 });
    doc.font("Times-Roman"); // Explicitly set a built-in font

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
          // Get image dimensions
          const dimensions = sizeOf(imageBuffer);
          if (!dimensions.width || !dimensions.height) {
            console.error("Failed to get image dimensions:", imageUrl);
            continue;
          }

          console.log({ dimensions });

          // Calculate scaled height for a fixed width of 400
          const imageWidth = 500; // Fixed width for images
          const imageHeight =
            (dimensions.height / dimensions.width) * imageWidth;

          // Check if there's enough space for the image
          if (doc.y + imageHeight > doc.page.height - 50) {
            // 50 is the bottom margin
            doc.addPage(); // Add a new page if there's not enough space
          }

          // Add the image to the PDF
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

    // Finalize PDF
    doc.end();

    // Set response headers for a downloadable PDF
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

// Fetch image and return as Buffer
async function fetchImageAsBuffer(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch image: ${url}`);
    const arrayBuffer = await res.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("Error fetching image:", error);
    return null; // Return null if image fetch fails
  }
}

/**
 * Extracts plain text from BlockArrayContent while preserving formatting.
 */
function extractTextFromBlocks(blocks: BlockArrayContent): string {
  if (!blocks) return "";

  return blocks
    .map((block) => {
      if (!block.children) return ""; // Skip if no children

      const textContent = block.children
        .map((child) => child.text || "") // Extract text from children
        .join(" "); // Join text fragments

      // Add formatting based on style (optional)
      switch (block.style) {
        case "h1":
          return `\n# ${textContent}\n`; // Simulate heading 1
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
    .join("\n"); // Separate blocks with a newline
}
