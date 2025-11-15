import React, { useEffect, useState } from "react";
import { dummyCreationData } from "../assets/assets";

import { Gem, Sparkles } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import CreationItem from "../component/CreationItem";

export default function Dashboard() {
  const [creation, setcreation] = useState([]);

  const getDashboardData = async () => {
    setcreation(dummyCreationData);
  };
  useEffect(() => {
    getDashboardData();
  }, []);

  return (  
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        {/* total creation  */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-green-200">
          <div>
            <p>Total Creation</p>
            <h2>{creation.length}</h2>
          </div>

          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center ">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>
        {/* Active Plan   */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-green-200">
          <div>
            <p>Active Plan</p>
            <h2>
              <Protect fallback="free">Premium</Protect>
            </h2>
          </div>

          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center ">
            <Gem className="w-5 text-white" />
          </div>
        </div>
      </div>


      <div className="space-y-3">
      <p className="mt-6 mb-4">
        Recent creations
      </p>

      {creation.map((item)=> <CreationItem key={item.id} item={item} />)}
      </div>
    </div>
  );
}
