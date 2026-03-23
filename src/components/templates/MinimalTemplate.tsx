import type { PublicProfileData } from "./PublicTemplateCard";
import PublicTemplateCard from "./PublicTemplateCard";

export default function MinimalTemplate(props: { profile: PublicProfileData }) {
  return <PublicTemplateCard variant="minimal" templateId={null} profile={props.profile} />;
}

