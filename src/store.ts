// import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";

export const themePrimary = persistentAtom<string>("themePrimary", "#FFFFFF");

export const themeOnPrimary = persistentAtom<string>(
  "themeOnPrimary",
  "#363636"
);

export const themeSecondary = persistentAtom<string>(
  "themeSecondary",
  "#D2D2D2"
);

export const selectedColorMapId = persistentAtom<string>(
  "selectedColorMapId",
  "1"
);
