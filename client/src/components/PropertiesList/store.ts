import { atom } from "nanostores";

export const propertiesListStore = atom(false);

export function toggleIsGridView() {
  propertiesListStore.set(!propertiesListStore.value);
}
