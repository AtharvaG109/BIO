import PracticePage, { metadata as practiceMetadata } from "../practice/page";

export const metadata = {
  ...practiceMetadata,
  title: "Learning",
  alternates: {
    canonical: "/practice/"
  },
  robots: {
    index: false,
    follow: true
  }
};

export default PracticePage;
