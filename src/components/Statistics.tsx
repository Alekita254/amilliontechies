export const Statistics = () => {
  interface statsProps {
    quantity: string;
    description: string;
  }

  const stats: statsProps[] = [
    {
      quantity: "10K+",
      description: "Students",
    },
    {
      quantity: "50+",
      description: "Courses",
    },
    {
      quantity: "100+",
      description: "Mentors",
    },
    {
      quantity: "20K+",
      description: "Hours of Content",
    },
  ];

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map(({ quantity, description }: statsProps) => (
          <div
            key={description}
            className="rounded-xl border border-border/60 bg-background/70 p-3 text-center sm:p-4"
          >
            <h2 className="text-2xl font-bold sm:text-3xl">{quantity}</h2>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm lg:text-base">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
