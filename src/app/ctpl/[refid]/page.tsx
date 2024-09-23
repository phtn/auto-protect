import { CTPLContent } from "./content";
interface CTPLPageProps {
  params: {
    refid: string | undefined;
  };
}
export default async function CTPLPage({ params }: CTPLPageProps) {
  return <CTPLContent {...params} />;
}
