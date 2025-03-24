import React from "react";

const CustomerBenefits = ({ benefits }) => {
  return (
    <div className="container mx-auto py-8 w-full">
      <div className="w-full mx-auto flex justify-center items-center flex-wrap">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex  gap-2 w-1/4">
            <img src={benefit.icon} alt="" className="w-[10%] h-[10%]" />
            <div className="text-left">
              <h3 className="font-bold text-gray-700">{benefit.title}</h3>
              <p className="text-gray-500">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerBenefits;
