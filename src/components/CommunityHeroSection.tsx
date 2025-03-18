import { Button } from "@/components/ui/button";
import { ContactPopover } from "./contactPopover";


const CommunityHeroSection = () => {
  return (
    <section className="w-full bg-gray-900 text-white py-16 px-6 rounded-xl">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold">Join Our Thriving Community</h1>
        <p className="mt-4 text-lg text-gray-300">
          Connect with like-minded individuals, participate in social events, and stay engaged through our social media channels.
        </p>
        {/* <Button className="mt-6">Get Involved</Button> */}
         <ContactPopover />
      </div>
    </section>
  );
};

export default CommunityHeroSection;