import type { PublicProfileData } from "./PublicTemplateCard";
import PublicTemplateCard from "./PublicTemplateCard";

export default function LuxuryTemplate(props: { profile: PublicProfileData }) {
  return (
    <PublicTemplateCard
      variant="luxury"
      templateId={null}
      profile={props.profile}
    />
  );
}

