import industries from "../../data/industriesContent.json";
import GlassIcons from "../GlassIcons";

import {
  Target,
  PenTool,
  SlidersHorizontal,
  Users,
  BarChart3,
  Eye,
} from "lucide-react";

const ICONS = {
  target: <Target className="h-5 w-5 sm:h-6 sm:w-6" />,
  penTool: <PenTool className="h-5 w-5 sm:h-6 sm:w-6" />,
  sliders: <SlidersHorizontal className="h-5 w-5 sm:h-6 sm:w-6" />,
  users: <Users className="h-5 w-5 sm:h-6 sm:w-6" />,
  barChart: <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6" />,
  eye: <Eye className="h-5 w-5 sm:h-6 sm:w-6" />,
};

export default function IndustriesSection() {
  const items = industries.items.map((it) => ({
    label: it.title,
    color: it.color || "brandSoft",
    // ✅ fallback is Target (neutral), not briefcase
    icon: ICONS[it.icon] || ICONS.target,
  }));

  return (
    <section className="bg-black py-14 sm:py-16 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {industries.heading}
        </h2>

        <div className="mt-8 sm:mt-10 flex justify-center">
          <GlassIcons
            items={items}
            className="
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-3
              lg:grid-cols-6
              gap-10
              sm:gap-14
              lg:gap-[3.5em]
            "
          />
        </div>
      </div>
    </section>
  );
}
