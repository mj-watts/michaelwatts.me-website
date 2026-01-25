import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";

import iomusicCoverImage from "../src/content/works/io-music/preview.png";
import webappsCoverImage from "../src/content/works/webapps/preview.png";
import ecommCoverImage from "../src/content/works/ecomm-sites/preview.png";
import sfmCoverImage from "../src/content/works/saudi-fashion-retail/preview.png";
import saCoverImage from "../src/content/works/swiftaid/preview.png";
import sppocCoverImage from "../src/content/works/split-payment-poc/preview.png";

export const themePrimary = persistentAtom<string>("themePrimary", "#FFFFFF");

export const themeOnPrimary = persistentAtom<string>(
  "themeOnPrimary",
  "#363636"
);

export const themeSecondary = persistentAtom<string>(
  "themeSecondary",
  "#D2D2D2"
);

export const themeEmphasis = persistentAtom<string>("themeEmphasis", "#0d9667");

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
    title: "iOS app development",
    description:
      "Native iOS and Android music video application. Launced successfully on Apple Store",
    link: "/work/io-music",
    bgcolor: "#292c33",
  },
  webapps: {
    image: webappsCoverImage,
    title: "Web applications",
    description:
      "Development of popular Carbon Footprint Calculator for World Wildlife Fund and internal applications for airline logistics brand",
    link: "/work/webapps",
    bgcolor: "#06274a",
  },
  ecomm: {
    image: ecommCoverImage,
    title: "Ecommerce development",
    description:
      "Ecommerce website development for a number of successful brands and payment gateway integration",
    link: "/work/ecomm-sites",
    bgcolor: "#85af89",
  },
  sfm: {
    image: sfmCoverImage,
    title: "CMS development & support",
    description:
      "Multilingual platform for large Saudi retail brand and social media campaigns for GAP and M&S",
    link: "/work/saudi-fashion-retail",
    bgcolor: "#eb8b61",
  },
  sa: {
    image: saCoverImage,
    title: "Complete SaaS platform suite",
    description:
      "Public and internal web applications used by millions of donors and household charities such as Comic Relief",
    link: "/work/swiftaid",
    bgcolor: "#187195",
  },
  sppoc: {
    image: sppocCoverImage,
    title: "Secure dashboard & portals",
    description:
      "Secure administrative portal built for HM Revenue & Customs to display transactional data",
    link: "/work/split-payment-poc",
    bgcolor: "#563d7c",
  },
});
