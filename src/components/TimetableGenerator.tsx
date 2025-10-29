import React, { useMemo, useState, useRef } from "react";
import type { UserProfile } from "../types";
import html2canvas from "html2canvas";

type Dosha = "vata" | "pitta" | "kapha";

interface Props {
  dosha?: Dosha;
  userProfile?: UserProfile | null;
}

type Slot = {
  start: string;
  end: string;
  title: string;
  note?: string;
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function addMinutesToTime(time: string, minutes: number) {
  const [h, m] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(h, m, 0, 0);
  date.setMinutes(date.getMinutes() + minutes);
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function generateTimetable(wakeUpTime: string, totalStudyMinutes: number, dosha: Dosha): Slot[] {
  const config = {
    vata: { studyBlockMin: 40, breakMin: 15, morningRoutineMin: 30, exerciseMin: 25 },
    pitta: { studyBlockMin: 60, breakMin: 20, morningRoutineMin: 20, exerciseMin: 35 },
    kapha: { studyBlockMin: 45, breakMin: 10, morningRoutineMin: 40, exerciseMin: 40 },
  }[dosha];

  const foods = {
    vata: "Warm, oily, grounding foods (like soups, ghee, rice, cooked vegetables)",
    pitta: "Cooling foods (like cucumber, coconut, leafy greens, milk)",
    kapha: "Light, dry, spicy foods (like millet, legumes, ginger tea)",
  }[dosha];

  const slots: Slot[] = [];

  const morningEnd = addMinutesToTime(wakeUpTime, config.morningRoutineMin);
  slots.push({
    start: wakeUpTime,
    end: morningEnd,
    title: "🌅 Morning Routine",
    note: "Hydration, tongue cleaning, light oil massage, gratitude journaling",
  });

  const exerciseEnd = addMinutesToTime(morningEnd, config.exerciseMin);
  slots.push({
    start: morningEnd,
    end: exerciseEnd,
    title: "🏃‍♀️ Exercise / Yoga",
    note:
      dosha === "vata"
        ? "Gentle yoga or walking"
        : dosha === "pitta"
        ? "Moderate yoga or swimming"
        : "Brisk walk or cardio for activation",
  });

  const breakfastEnd = addMinutesToTime(exerciseEnd, 30);
  slots.push({
    start: exerciseEnd,
    end: breakfastEnd,
    title: "🍽️ Breakfast",
    note: foods,
  });

  let remaining = totalStudyMinutes;
  let currentStart = breakfastEnd;
  let blockIndex = 0;

  while (remaining > 0 && blockIndex < 10) {
    const blockMinutes = Math.min(config.studyBlockMin, remaining);
    const blockEnd = addMinutesToTime(currentStart, blockMinutes);
    slots.push({
      start: currentStart,
      end: blockEnd,
      title: `📘 Study Block ${blockIndex + 1}`,
      note: "Focused deep work — keep posture straight, hydrated",
    });
    remaining -= blockMinutes;

    if (remaining > 0) {
      const breakEnd = addMinutesToTime(blockEnd, config.breakMin);
      slots.push({
        start: blockEnd,
        end: breakEnd,
        title: "☕ Short Break",
        note: `Stretch, hydrate, and relax (${config.breakMin} min)`,
      });
      currentStart = breakEnd;
    } else {
      currentStart = blockEnd;
    }
    blockIndex++;
  }

  const lunchEnd = addMinutesToTime(currentStart, 45);
  slots.push({
    start: currentStart,
    end: lunchEnd,
    title: "🥗 Lunch",
    note: `${foods}. Avoid screens while eating. Eat mindfully.`,
  });

  const napEnd = addMinutesToTime(lunchEnd, 30);
  slots.push({
    start: lunchEnd,
    end: napEnd,
    title: "🛏️ Rest / Meditation",
    note: "Power nap or guided mindfulness (max 30 min)",
  });

  const afternoonStudyEnd = addMinutesToTime(napEnd, 60);
  slots.push({
    start: napEnd,
    end: afternoonStudyEnd,
    title: "📖 Light Review or Creative Work",
    note: "Summarize learnings or plan next tasks",
  });

  const eveningEnd = addMinutesToTime(afternoonStudyEnd, 60);
  slots.push({
    start: afternoonStudyEnd,
    end: eveningEnd,
    title: "🚶 Evening Walk / Hobby",
    note: "Go for a light walk or enjoy a calming hobby",
  });

  const dinnerEnd = addMinutesToTime(eveningEnd, 40);
  slots.push({
    start: eveningEnd,
    end: dinnerEnd,
    title: "🍲 Dinner",
    note: `${foods}. Light and early for better digestion.`,
  });

  const relaxEnd = addMinutesToTime(dinnerEnd, 45);
  slots.push({
    start: dinnerEnd,
    end: relaxEnd,
    title: "🧘 Meditation / Reflection",
    note: "Slow breathing, gratitude journaling, no screens",
  });

  const sleepEnd = addMinutesToTime(relaxEnd, 8 * 60);
  slots.push({
    start: relaxEnd,
    end: sleepEnd,
    title: "🌙 Sleep",
    note: "Rest deeply — follow body rhythm and wake naturally",
  });

  return slots;
}

const TimetableGenerator: React.FC<Props> = ({ dosha = "vata", userProfile = null }) => {
  const defaultWake = { vata: "06:30", pitta: "06:00", kapha: "05:30" }[dosha];
  const [wakeUpTime, setWakeUpTime] = useState(defaultWake);
  const [studyHours, setStudyHours] = useState(4);
  const [customNote, setCustomNote] = useState("");
  const timetableRef = useRef<HTMLDivElement | null>(null);

  const totalStudyMinutes = useMemo(() => Math.max(0, Math.round(studyHours * 60)), [studyHours]);
  const slots = useMemo(() => generateTimetable(wakeUpTime, totalStudyMinutes, dosha), [wakeUpTime, totalStudyMinutes, dosha]);

  const handleDownloadPNG = async () => {
    if (!timetableRef.current) return;
    const canvas = await html2canvas(timetableRef.current);
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `timetable-${dosha}-${new Date().toISOString().slice(0, 10)}.png`;
    a.click();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-amber-100 via-lime-50 to-emerald-100 rounded-3xl shadow-xl">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-amber-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-serif text-amber-800">🪔 Ayurvedic Day Planner</h2>
            <p className="text-sm text-amber-700">
              Personalized for <span className="capitalize font-semibold">{dosha}</span> Dosha
            </p>
          </div>

          <div className="text-right">
            <div className="text-xs text-gray-500">Profile</div>
            <div className="text-sm font-semibold">{userProfile?.name ?? "Student"}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <label className="flex flex-col">
            <span className="text-xs text-gray-700">Wake-up time</span>
            <input type="time" value={wakeUpTime} onChange={(e) => setWakeUpTime(e.target.value)} className="mt-1 p-2 border rounded-md" />
          </label>

          <label className="flex flex-col">
            <span className="text-xs text-gray-700">Daily study hours</span>
            <input type="number" min={0} max={12} step={0.5} value={studyHours} onChange={(e) => setStudyHours(Number(e.target.value))} className="mt-1 p-2 border rounded-md" />
          </label>

          <label className="flex flex-col">
            <span className="text-xs text-gray-700">Custom note</span>
            <input type="text" value={customNote} onChange={(e) => setCustomNote(e.target.value)} placeholder="e.g., exam week" className="mt-1 p-2 border rounded-md" />
          </label>
        </div>

        <div className="mt-4 flex gap-3">
          <button className="px-4 py-2 bg-amber-600 text-white rounded-xl shadow hover:bg-amber-700">Regenerate</button>
          <button onClick={handleDownloadPNG} className="px-4 py-2 bg-emerald-600 text-white rounded-xl shadow hover:bg-emerald-700">
            Download PNG
          </button>
          <button onClick={() => window.print()} className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50">
            Print
          </button>
        </div>
      </div>

      <div className="mt-6" ref={timetableRef}>
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-amber-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-amber-800">🌿 Your Personalized Routine</h3>
            <div className="text-sm text-gray-500">{new Date().toLocaleDateString()}</div>
          </div>

          <div className="space-y-3">
            {slots.map((s, idx) => (
              <div key={idx} className="flex items-start gap-4 p-3 rounded-lg border border-amber-200 bg-amber-50/40 hover:bg-amber-100/60 transition">
                <div className="w-20 text-sm font-mono text-gray-600">
                  <div>{s.start}</div>
                  <div className="text-xs text-gray-400">{s.end}</div>
                </div>
                <div>
                  <div className="font-semibold text-amber-900">{s.title}</div>
                  {s.note && <div className="text-sm text-gray-700">{s.note}</div>}
                </div>
              </div>
            ))}
          </div>

          {customNote && (
            <div className="mt-4 text-sm text-emerald-800 border-l-4 border-emerald-300 pl-3">
              <strong>Note:</strong> {customNote}
            </div>
          )}
        </div>

        <div className="mt-4 text-xs text-amber-700 text-center">
          🌸 “Balance your routine, balance your life.” – Ayurveda Wisdom
        </div>
      </div>
    </div>
  );
};

export default TimetableGenerator;
