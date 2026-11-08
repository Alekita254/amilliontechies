import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

// Chart.js draws on a canvas, so read the theme's CSS variables and re-read them
// whenever the <html> class flips between light and dark.
const hsl = (name: string) =>
  `hsl(${getComputedStyle(document.documentElement).getPropertyValue(name).trim()})`;

function useThemeColors() {
  const read = () => ({
    primary: hsl("--primary"),
    text: hsl("--muted-foreground"),
    grid: hsl("--border"),
  });
  const [colors, setColors] = useState(read);
  useEffect(() => {
    const observer = new MutationObserver(() => setColors(read()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return colors;
}

const PIE_COLORS = ["#16a34a", "#3b82f6", "#f59e0b", "#a855f7", "#ef4444", "#14b8a6"];

type GraphCardProps = {
  type: "bar" | "pie";
  title: string;
  /** Chart labels and values; the card applies the theme colors. */
  labels: string[];
  values: number[];
  label?: string;
};

export const GraphCard = ({ type, title, labels, values, label = "" }: GraphCardProps) => {
  const c = useThemeColors();
  const empty = values.length === 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        {empty ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Nothing to show yet
          </div>
        ) : type === "bar" ? (
          <Bar
            data={{
              labels,
              datasets: [{ label, data: values, backgroundColor: c.primary, borderRadius: 6, maxBarThickness: 36 }],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                x: { grid: { display: false }, ticks: { color: c.text } },
                y: { beginAtZero: true, ticks: { color: c.text, precision: 0 }, grid: { color: c.grid } },
              },
            }}
          />
        ) : (
          <Pie
            data={{
              labels,
              datasets: [{ data: values, backgroundColor: PIE_COLORS, borderWidth: 0 }],
            }}
            options={{
              maintainAspectRatio: false,
              cutout: "62%",
              plugins: { legend: { position: "bottom", labels: { color: c.text, usePointStyle: true } } },
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};
