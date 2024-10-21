import ListingsList from "@/components/listings-list";
import { getListedProperties } from "@/services/properties";
import { redirect } from "next/navigation";

export default async function PropiedadesPage() {
  const listings = await getListedProperties();
  if (!listings) {
    return redirect("/404");
  }
  return <ListingsList listings={listings} />;
}
