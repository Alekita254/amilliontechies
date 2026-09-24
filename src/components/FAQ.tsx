import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "What is A Million Techies?",
    answer:
      "A Million Techies is a global tech community that connects developers, designers, and entrepreneurs to share knowledge, opportunities, and resources.",
    value: "item-1",
  },
  {
    question: "How can I join the community?",
    answer:
      "You can join by subscribing to our newsletter, following us on social media, and participating in our events and discussions.",
    value: "item-2",
  },
  {
    question: "Is A Million Techies free to join?",
    answer:
      "Yes! Our community is open to everyone. We provide free access to resources, events, and networking opportunities.",
    value: "item-3",
  },
  {
    question: "Do you offer mentorship programs?",
    answer:
      "Yes, we connect experienced professionals with those looking to grow their careers in tech through mentorship sessions and discussions.",
    value: "item-4",
  },
  {
    question: "How can I contribute or collaborate?",
    answer:
      "You can contribute by sharing knowledge, writing articles, hosting events, or volunteering in our initiatives. Reach out to us to get involved!",
    value: "item-5",
  },
  {
    question: "Are there job opportunities available?",
    answer:
      "Yes, we regularly share job openings, internships, and freelance gigs from partner companies and community members.",
    value: "item-6",
  },
  {
    question: "How often do you host events?",
    answer:
      "We organize virtual and in-person events regularly, including hackathons, webinars, and networking sessions. Stay tuned for updates!",
    value: "item-7",
  },
];



export const FAQ = () => {
  return (
    <section
      id="faq"
      className="container px-4 py-24 sm:py-32"
    >
      <h2 className="mb-4 text-3xl font-bold md:text-4xl">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="mt-6 text-sm font-medium sm:text-base">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
