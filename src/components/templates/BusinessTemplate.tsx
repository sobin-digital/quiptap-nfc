import type { PublicProfileData } from "./PublicTemplateCard";
import PublicTemplateCard from "./PublicTemplateCard";

export default function BusinessTemplate(props: { profile: PublicProfileData }) {
  return <PublicTemplateCard variant="business" templateId={null} profile={props.profile} />;
}

