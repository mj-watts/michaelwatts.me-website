import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";

import iomusicCoverImage from "../src/content/works/io-music/preview.png";
import iomusicCoverImageOutline from "../src/content/works/io-music/preview-outline.png";

import webappsCoverImage from "../src/content/works/webapps/preview.png";
import webappsCoverImageOutline from "../src/content/works/webapps/preview-outline.png";

import ecommCoverImage from "../src/content/works/ecomm-sites/preview.png";
import ecommCoverImageOutline from "../src/content/works/ecomm-sites/preview-outline.png";

import sfmCoverImage from "../src/content/works/saudi-fashion-retail/preview.png";
import sfmCoverImageOutline from "../src/content/works/saudi-fashion-retail/preview-outline.png";

import saCoverImage from "../src/content/works/swiftaid/preview.png";
import saCoverImageOutline from "../src/content/works/swiftaid/preview-outline.png";

import sppocCoverImage from "../src/content/works/split-payment-poc/preview.png";
import sppocCoverImageOutline from "../src/content/works/split-payment-poc/preview-outline.png";

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
    outlineImage: { src: string };
    title: string;
    description: string;
    link: string;
    bgcolor: string;
  };
}

export const recommendedWork = atom<RecommendedWorkCollection>({
  iomusic: {
    image: iomusicCoverImage,
    outlineImage: iomusicCoverImageOutline,
    title: "iOS and Android music streaming app",
    description:
      "Cross-platform music streaming app with collaborative party mode",
    link: "/work/io-music",
    bgcolor: "#292c33",
  },
  webapps: {
    image: webappsCoverImage,
    outlineImage: webappsCoverImageOutline,
    title: "WWF Carbon Footprint Calculator",
    description: "An animated questionnaire application used by millions",
    link: "/work/webapps",
    bgcolor: "#06274a",
  },
  ecomm: {
    image: ecommCoverImage,
    outlineImage: ecommCoverImageOutline,
    title: "Ecommerce sites and social media applications",
    description: "Payment gateway integration and ecomm platform development",
    link: "/work/ecomm-sites",
    bgcolor: "#85af89",
  },
  sfm: {
    image: sfmCoverImage,
    outlineImage: sfmCoverImageOutline,
    title: "CMS development and brand engagement tools",
    description:
      "Multilingual retail platform and social media campaigns for GAP",
    link: "/work/saudi-fashion-retail",
    bgcolor: "#eb8b61",
  },
  sa: {
    image: saCoverImage,
    outlineImage: saCoverImageOutline,
    title: "Financial SaaS Gift Aid platform",
    description:
      "Used by millions of donors and making Gift Aid processing smarter",
    link: "/work/swiftaid",
    bgcolor: "#187195",
  },
  sppoc: {
    image: sppocCoverImage,
    outlineImage: sppocCoverImageOutline,
    title: "UK Gov split VAT payment platform",
    description: "Secure and accessible administrative portal built for HMRC",
    link: "/work/split-payment-poc",
    bgcolor: "#563d7c",
  },
});
