import ListingsList from "@/components/listings-list";
import { getAllListings } from "@/services/get-all-listings";
import { notFound } from "next/navigation";

export default async function PropiedadesPage() {
  const listings = await getAllListings();
  if (!listings) {
    return notFound();
  }
  return <ListingsList listings={listings} />;
}
