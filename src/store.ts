import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import iomusicCoverImage from "../src/content/works/io-music/recommended-cover-image.png";
import webappsCoverImage from "../src/content/works/webapps/recommended-cover-image.png";
import ecommCoverImage from "../src/content/works/ecomm-sites/recommended-cover-image.png";
import sfmCoverImage from "../src/content/works/saudi-fashion-retail/recommended-cover-image.png";
import saCoverImage from "../src/content/works/swiftaid/recommended-cover-image.png";
import sppocCoverImage from "../src/content/works/split-payment-poc/recommended-cover-image.png";

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

export interface RecommendedWorkCollection {
  [key: string]: {
    image: { src: string };
    title: string;
    description: string;
    link: string;
    bgcolor: string;
  };
}

export const recommendedWork = atom<RecommendedWorkCollection>({
  iomusic: {
    image: iomusicCoverImage,
    title: "iOS & Android music streaming app",
    description:
      "Cross-platform music streaming app with collaborative party mode",
    link: "/work/io-music",
    bgcolor: "#292c33",
  },
  webapps: {
    image: webappsCoverImage,
    title: "WWF Carbon Footprint Calculator",
    description: "Animated WWF Carbon Footprint Calculator",
    link: "/work/webapps",
    bgcolor: "#06274a",
  },
  ecomm: {
    image: ecommCoverImage,
    title: "Ecommerce sites and social media",
    description: "Ecommerce platforms, integrating multiple payment gateways",
    link: "/work/ecomm-sites",
    bgcolor: "#85af89",
  },
  sfm: {
    image: sfmCoverImage,
    title: "Multilingual content platform & brand engagement tools",
    description:
      "Multilingual content platform and social media brand campaigns",
    link: "/work/saudi-fashion-retail",
    bgcolor: "#eb8b61",
  },
  sa: {
    image: saCoverImage,
    title: "Swiftaid automated Gift Aid processor",
    description:
      "Used by millions of donors and making Gift Aid processing smarter",
    link: "/work/swiftaid",
    bgcolor: "#187195",
  },
  sppoc: {
    image: sppocCoverImage,
    title: "Proof-of-concept administrative portal for HMRC",
    description:
      "Developed secure proof-of-concept administrative portal for HMRC",
    link: "/work/split-payment-poc",
    bgcolor: "#563d7c",
  },
});
