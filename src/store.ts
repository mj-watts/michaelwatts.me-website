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
    title: "Cross-platform music streaming app with collaborative party mode",
    description:
      "A cross-platform app built with React Native, native iOS components, and Firebase backend services.",
    link: "/work/io-music",
    bgcolor: "#292c33",
  },
  webapps: {
    image: webappsCoverImage,
    title: "WWF Carbon Footprint Calculator",
    description:
      "Interactive WWF calculator with CMS, Vue.js UI, and Anime.js animations.",
    link: "/work/webapps",
    bgcolor: "#06274a",
  },
  ecomm: {
    image: ecommCoverImage,
    title: "Ecommerce platforms",
    description:
      "With improved checkout conversion and multi-gateway payments.",
    link: "/work/ecomm-sites",
    bgcolor: "#85af89",
  },
  sfm: {
    image: sfmCoverImage,
    title: "Multilingual content platform & brand engagement tools",
    description:
      "Multilingual content platform with custom features and social media campaigns.",
    link: "/work/saudi-fashion-retail",
    bgcolor: "#eb8b61",
  },
  sa: {
    image: saCoverImage,
    title: "Gift Aid platform: Swiftaid",
    description:
      "Used by millions of donors, and thousands of charities such as JustGiving, Shelter and Comic Relief.",
    link: "/work/swiftaid",
    bgcolor: "#187195",
  },
  sppoc: {
    image: sppocCoverImage,
    title: "Secure proof-of-concept administrative portal for HMRC",
    description:
      "Securely handled large-scale transactional data, using Elasticsearch and Kibana.",
    link: "/work/split-payment-poc",
    bgcolor: "#563d7c",
  },
});
