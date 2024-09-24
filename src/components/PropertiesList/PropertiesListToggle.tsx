import { Toggle } from "@/components/ui/toggle";
import { Grid2X2, List } from "lucide-react";
import { useStore } from "@nanostores/react";
import {
  propertiesListStore,
  toggleIsGridView,
} from "@/components/PropertiesList/store";

export default function PropertiesListToggle() {
  const isGridView = useStore(propertiesListStore);
  return (
    <Toggle
      aria-label="Toggle view"
      pressed={isGridView}
      onPressedChange={toggleIsGridView}
    >
      {isGridView ? (
        <Grid2X2 className="h-4 w-4" />
      ) : (
        <List className="h-4 w-4" />
      )}
    </Toggle>
  );
}
