import ListingsList from "@/components/listings-list";
import { getAllListings } from "@/services/get-all-listings";
import { redirect } from "next/navigation";

export default async function PropiedadesPage() {
  const listings = await getAllListings();
  if (!listings) {
    return redirect("/404");
  }
  return <ListingsList listings={listings} />;
}
