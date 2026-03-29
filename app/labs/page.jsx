import WorkbenchPage, { metadata as workbenchMetadata } from "../workbench/page";

export const metadata = {
  ...workbenchMetadata,
  title: "Workbench",
  alternates: {
    canonical: "/workbench/"
  },
  robots: {
    index: false,
    follow: true
  }
};

export default WorkbenchPage;
