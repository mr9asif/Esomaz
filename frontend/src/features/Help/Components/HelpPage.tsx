import { Bug, Construction, FileText, LifeBuoy, Mail, ShieldCheck } from "lucide-react";

const upcomingFeatures = [
  {
    icon: Mail,
    title: "Contact Support",
    description:
      "Send questions or support requests directly to our team via email.",
  },
  {
    icon: Bug,
    title: "Bug Reporting",
    description:
      "Report bugs and unexpected issues to help improve Esomaz.",
  },
  {
    icon: FileText,
    title: "Frequently Asked Questions",
    description:
      "Quick answers to common questions about using Esomaz.",
  },
  {
    icon: ShieldCheck,
    title: "Community Guidelines",
    description:
      "Learn how to keep Esomaz safe, respectful, and welcoming for everyone.",
  },
  {
    icon: LifeBuoy,
    title: "Help Center",
    description:
      "Step-by-step guides and helpful resources for every feature.",
  },
];

const HelpPage = () => {
  return (
    
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Hero */}
        <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Construction className="h-8 w-8 text-primary" />
          </div>

          <h1 className="text-3xl font-bold">Help & Support</h1>

          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            We're working on a dedicated Help Center to provide a better support
            experience for all Esomaz users.
          </p>

          <div className="mt-6 inline-flex items-center rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-600 dark:text-yellow-400">
            🚧 This page is currently under development.
          </div>
        </div>

        {/* Upcoming Features */}
        <section className="mt-10">
          <h2 className="mb-6 text-2xl font-semibold">
            What's Coming Soon
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            {upcomingFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-xl border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="text-lg font-semibold">{feature.title}</h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Timeline */}
        <section className="mt-10 rounded-2xl border bg-card p-6">
          <h2 className="text-xl font-semibold">Planned Improvements</h2>

          <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
            <li>✅ Frequently Asked Questions (FAQ)</li>
            <li>⏳ Contact Support via Email</li>
            <li>⏳ Report a Bug</li>
            <li>⏳ Community Guidelines</li>
            <li>⏳ Privacy Policy</li>
            <li>⏳ Help Center & Tutorials</li>
          </ul>
        </section>

        {/* Footer */}
        <div className="mt-10 rounded-xl border border-dashed p-6 text-center">
          <h3 className="text-lg font-semibold">
            Thank you for using Esomaz ❤️
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            We're continuously improving Esomaz and adding new features to make
            your experience better. Help & Support will be available in an
            upcoming update.
          </p>
        </div>
      </div>
  
  );
};

export default HelpPage;