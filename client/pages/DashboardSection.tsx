import { useParams } from "react-router-dom";
import { findRole, findSection } from "@/lib/dashboard";
import Placeholder from "./Placeholder";
import NotFound from "./NotFound";

export default function DashboardSection() {
  const { role: roleSlug, section: sectionSlug } = useParams();
  const role = findRole(roleSlug);
  const section = role && findSection(role, sectionSlug);
  if (!role || !section) return <NotFound />;

  return (
    <Placeholder
      title={section.title}
      backTo={`/dashboard/${role.slug}`}
      backLabel={`Back to ${role.label} dashboard`}
    />
  );
}
