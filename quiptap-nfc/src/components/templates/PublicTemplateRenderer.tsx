import type { PublicProfileData } from "./PublicTemplateCard";
import MinimalTemplate from "./MinimalTemplate";
import BusinessTemplate from "./BusinessTemplate";
import LuxuryTemplate from "./LuxuryTemplate";

export default function PublicTemplateRenderer(props: {
  templateId: string | null;
  profile: PublicProfileData;
}) {
  const resolved =
    props.templateId === "gilded-profile"
      ? "luxury"
      : props.templateId === "noir-executive"
        ? "business"
        : props.templateId === "aether-transparent"
          ? "minimal"
          : "minimal";

  if (resolved === "luxury") return <LuxuryTemplate profile={props.profile} />;
  if (resolved === "business") return <BusinessTemplate profile={props.profile} />;
  return <MinimalTemplate profile={props.profile} />;
}

