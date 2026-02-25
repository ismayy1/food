import { Leaf, Clock, Heart, Truck } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description:
      "We source the freshest produce daily, ensuring every bite is packed with authentic flavor.",
  },
  {
    icon: Heart,
    title: "Healthy & Tasty",
    description:
      "Delicious fast-food that is good for you. Our falafel is baked and packed with plant-based protein.",
  },
  {
    icon: Clock,
    title: "Fast Service",
    description:
      "From order to plate in minutes. Quick, efficient service without compromising on quality.",
  },
  {
    icon: Truck,
    title: "Delivery Available",
    description:
      "Enjoy our food at home with no-contact delivery. Order online and we bring it to your door.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            <span className="text-balance">Why Choose Falafilo?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We take pride in every wrap we serve. Here is what makes us
            different.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
