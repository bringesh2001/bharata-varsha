import { ogCard, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = "Bharata Varsha — India's history, sorted into eras";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "5,000 years · 12 eras · one library",
    title: "India's past, sorted into eras you can actually study",
  });
}
