import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

interface DynamicIconProps extends LucideProps {
  name: string;
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const pascalName = toPascalCase(name);
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>)[pascalName];

  if (!Icon) {
    const Fallback = LucideIcons.BookOpen;
    return <Fallback {...props} />;
  }

  return <Icon {...props} />;
}
