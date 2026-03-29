import LabsPage, { metadata as labsMetadata } from "../labs/page";

export const metadata = {
  ...labsMetadata,
  title: "Labs",
  alternates: {
    canonical: "/labs/"
  },
  robots: {
    index: false,
    follow: true
  }
};

export default LabsPage;
