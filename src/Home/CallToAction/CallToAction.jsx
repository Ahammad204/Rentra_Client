import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import bannerImg from "../../assets/ctcbanner.png";

const CallToAction = () => {
  return (
    <section
      className="relative py-20 my-10 text-white overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerImg})` }} 
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <Card className="bg-white/10 backdrop-blur-md border-none shadow-xl rounded-2xl">
          <CardContent className="p-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Start Earning / Start Renting Today 🚀
            </h2>
            <p className="text-base md:text-lg mb-8 text-gray-200">
              Join our platform and explore endless opportunities. Rent out
              your items or find what you need with ease.
            </p>
            <Button
              size="lg"
              className="bg-[#0fb894] cursor-pointer text-white font-semibold rounded-xl px-8 py-6
               hover:bg-[#0ca383]"
            >
              Get Started
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CallToAction;
