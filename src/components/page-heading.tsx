
interface PageHeadingProps {
    title: string;
    subtitle: string;
  }
  
  export const PageHeading = ({ title, subtitle }: PageHeadingProps) => (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
  