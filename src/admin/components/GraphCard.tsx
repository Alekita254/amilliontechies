import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

type GraphCardProps = {
  type: "bar" | "pie";
  title: string;
  data: any;
  options?: any;
};

export const GraphCard = ({ type, title, data, options }: GraphCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        {type === "bar" ? (
          <Bar data={data} options={options} />
        ) : (
          <Pie data={data} options={options} />
        )}
      </CardContent>
    </Card>
  );
};