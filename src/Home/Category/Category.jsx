import React from "react";
import { Briefcase, Package, Car, Camera } from "lucide-react";

const Category = () => {
  return (
    <div className="my-4 mx-auto px-6 ">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center mb-10">Explore Categories</h2>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Category Card 1 */}
        <div className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-2xl hover:shadow-lg hover:scale-105 transition cursor-pointer">
          <Briefcase size={36} className="text-indigo-600 mb-3" />
          <p className="font-semibold">Errand Services</p>
        </div>

        {/* Category Card 2 */}
        <div className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-2xl hover:shadow-lg hover:scale-105 transition cursor-pointer">
          <Package size={36} className="text-green-600 mb-3" />
          <p className="font-semibold">Item Rentals</p>
        </div>

        {/* Category Card 3 */}
        <div className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-2xl hover:shadow-lg hover:scale-105 transition cursor-pointer">
          <Car size={36} className="text-red-600 mb-3" />
          <p className="font-semibold">Vehicles</p>
        </div>

        {/* Category Card 4 */}
        <div className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-2xl hover:shadow-lg hover:scale-105 transition cursor-pointer">
          <Camera size={36} className="text-yellow-500 mb-3" />
          <p className="font-semibold">Electronics</p>
        </div>
      </div>
    </div>
  );
};

export default Category;
