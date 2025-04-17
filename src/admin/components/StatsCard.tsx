// components/dashboard/StatsCard.tsx
import { ArrowUp, ArrowDown, TrendingUp, Check, Briefcase, Users } from 'lucide-react';

type StatsCardProps = {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
};

export function StatsCard({ title, value, change, icon }: StatsCardProps) {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-md bg-green-100 text-green-600 flex items-center justify-center">
              {icon}
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">
                  {value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
        <div className={`mt-4 flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? (
            <ArrowUp className="flex-shrink-0 mr-1 h-4 w-4" />
          ) : (
            <ArrowDown className="flex-shrink-0 mr-1 h-4 w-4" />
          )}
          <span>
            {change}% from last month
          </span>
        </div>
      </div>
    </div>
  );
}

// Example usage:
export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Users"
        value="12,345"
        change={12.5}
        icon={<Users className="h-5 w-5" />}
      />
      <StatsCard
        title="Active Projects"
        value="54"
        change={8.2}
        icon={<Briefcase className="h-5 w-5" />}
      />
      <StatsCard
        title="Tasks Completed"
        value="1,234"
        change={-2.3}
        icon={<Check className="h-5 w-5" />}
      />
      <StatsCard
        title="Productivity"
        value="87%"
        change={5.7}
        icon={<TrendingUp className="h-5 w-5" />}
      />
    </div>
  );
}