import { atom } from "nanostores";

export const propertiesListStore = atom(false);

export function toggleIsGridView() {
  console.log(propertiesListStore.value);
  propertiesListStore.set(!propertiesListStore.value);
}
