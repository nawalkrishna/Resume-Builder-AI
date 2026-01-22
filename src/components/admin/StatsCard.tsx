import React from "react";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color?: "blue" | "green" | "purple" | "orange" | "red";
}

const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600",
};

export const StatsCard: React.FC<StatsCardProps> = ({
    title,
    value,
    icon,
    trend,
    color = "blue",
}) => {
    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-slate-400 text-sm font-medium">{title}</p>
                    <p className="text-3xl font-bold text-white mt-2">{value}</p>
                    {trend && (
                        <p className={`text-sm mt-2 ${trend.isPositive ? "text-green-400" : "text-red-400"}`}>
                            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last week
                        </p>
                    )}
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}>
                    <span className="text-2xl">{icon}</span>
                </div>
            </div>
        </div>
    );
};
