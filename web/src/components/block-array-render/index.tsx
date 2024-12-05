/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { PortableText, PortableTextComponents } from "next-sanity";
import Image from "next/image";

// Define types for the Sanity block array content
interface BlockArrayContent {
  _type: string;
  [key: string]: any; // Allow additional properties from Sanity
}

// Define custom components for PortableText rendering
const myPortableTextComponents: PortableTextComponents = {
  // Customize specific block types (e.g., images, code blocks)
  types: {
    image: ({ value }: { value: { url: string; alt?: string } }) => (
      <Image
        src={value.url}
        alt={value.alt || "Image"}
        style={{ maxWidth: "100%" }}
      />
    ),
    code: ({ value }: { value: { code: string } }) => (
      <pre style={{ backgroundColor: "#f4f4f4", padding: "1rem" }}>
        <code>{value.code}</code>
      </pre>
    ),
  },
  // Customize inline marks (e.g., links)
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href: string };
    }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  // Customize block elements (e.g., headers, paragraphs)
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 style={{ color: "#333", fontSize: "2em" }}>{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 style={{ color: "#555", fontSize: "1.5em" }}>{children}</h2>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p style={{ lineHeight: "1.6em" }}>{children}</p>
    ),
  },
};

// Define props with TypeScript interface
interface BlockArrayRendererProps {
  blockArrayContent: BlockArrayContent[];
}

// Component implementation
const BlockArrayRenderer: React.FC<BlockArrayRendererProps> = ({
  blockArrayContent,
}) => (
  <PortableText
    value={blockArrayContent}
    components={myPortableTextComponents}
  />
);

export default BlockArrayRenderer;
