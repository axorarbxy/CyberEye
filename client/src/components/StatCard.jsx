import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import CountUp from "./CountUp";

function StatCard({ icon, label, value, trendData, gradient, accentColor, lineColor }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: `0 12px 28px ${accentColor}33` }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        flex: 1,
        borderRadius: "14px",
        padding: "20px",
        background: gradient,
        border: `1px solid ${accentColor}44`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: `${accentColor}22`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
        }}>
          {icon}
        </div>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-dim)", letterSpacing: "0.03em" }}>
          {label}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <span style={{ fontSize: "34px", fontWeight: 800, color: accentColor }}>
          <CountUp value={value} />
        </span>

        {trendData && trendData.length > 1 && (
          <div style={{ width: "90px", height: "36px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={lineColor}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default StatCard;
