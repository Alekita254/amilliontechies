import { Statistics } from "./Statistics";
import about from "../assets/about-us.png";
import { Button } from "./ui/button";


export const About = () => {
  return (
    <section
      id="about"
      className="container py-24 sm:py-32"
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={about}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                A {" "} Million {" "} Techies
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
              A Million Techies is a community-driven initiative dedicated to
            empowering everyone with the essential IT and technical skills,
            completely free of charge. Our mission is to bridge the digital divide
            by providing comprehensive learning resources in Linux, Networking,
            Cloud Computing, Python, Cybersecurity, Data Science, AI/ML, and more.
              </p>
              {" "}
              <p className="text-xl text-muted-foreground mt-4">
              We believe that technology should be accessible to all. Our vibrant
            community of learners, mentors, and industry professionals collaborates
            and grows together, making tech education an inclusive journey. Join us
            in transforming lives and building a future where everyone can thrive
            in the digital world.
              </p>
            </div>

            <Statistics />

            <div className="text-center">
              <Button className="w-full md:w-1/3">Join The Movement Now</Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
