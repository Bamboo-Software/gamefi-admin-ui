import { CardTitle, CardDescription } from "@/components/ui/card";

interface SectionHeaderProps {
  title: string;
  description: string;
}

export const SectionHeader = ({ title, description }: SectionHeaderProps) => (
  <>
    <CardTitle>{title}</CardTitle>
    <CardDescription>{description}</CardDescription>
  </>
);
