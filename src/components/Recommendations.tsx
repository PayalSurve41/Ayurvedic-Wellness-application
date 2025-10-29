import React from "react";
import { recommendations } from "../data/recommendations";

export default function Recommendations({ dosha }: { dosha: string }) {
  const rec = recommendations[dosha.toLowerCase() as keyof typeof recommendations];
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold text-center capitalize">{dosha} Recommendations</h2>
      <h3 className="mt-4 font-semibold">🍽️ Foods</h3>
      <ul className="list-disc ml-6">{rec.foods.map(f => <li key={f}>{f}</li>)}</ul>
      <h3 className="mt-4 font-semibold">🧘 Lifestyle</h3>
      <ul className="list-disc ml-6">{rec.lifestyle.map(l => <li key={l}>{l}</li>)}</ul>
    </div>
  );
}
