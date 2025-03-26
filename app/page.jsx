import DailyWords from "@/components/DailyWords";
import { ArrowDown } from "lucide-react";

async function newData() {
  const res = await fetch(
    "https://api.dictionaryapi.dev/api/v2/entries/en/hello",
    { next: { revalidate: 1000 } }
  );
  if (!res.ok) {
    throw new Error("Error on fetch data!");
  }
  return res.json();
}

export default async function Home() {
  const data = await newData();
  // console.log(data);
  const date = new Date();
  const today = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto px-2 md:px-4 py-2 space-y-2">
      <div className="border rounded-md p-2 flex justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Today&apos;s words:</h2>
          <p className="text-neutral-600">{today}</p>
        </div>
        <div>
          <div>5 words</div>
          <div className="flex justify-end">
            <ArrowDown />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="border rounded-md p-2">
          <h4 className="text-xl font-semibold">Name</h4>
          <h4 className="text-lg font-semibold text-neutral-600">নাম</h4>
        </div>
      ))}
      </div>
      <DailyWords/>
    </div>
  );
}
