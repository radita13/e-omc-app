import {
  AlertCircle,
  AlertTriangle,
  Siren,
  Smile,
  XCircle,
} from "lucide-react";

const GRADE_CONFIG = {
  0: {
    label: "Normal",
    desc: "Kondisi Sehat",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    badgeBg: "bg-emerald-100/70 text-emerald-800 border-emerald-200",
    icon: Smile,
  },
  1: {
    label: "Ringan",
    desc: "Gejala Awal",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    badgeBg: "bg-amber-100/70 text-amber-900 border-amber-200",
    icon: AlertCircle,
  },
  2: {
    label: "Sedang",
    desc: "Butuh Perhatian",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
    badgeBg: "bg-orange-100/70 text-orange-900 border-orange-200",
    icon: AlertTriangle,
  },
  3: {
    label: "Berat",
    desc: "Intervensi Medis",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50",
    badgeBg: "bg-rose-100/70 text-rose-900 border-rose-200",
    icon: XCircle,
  },
  4: {
    label: "GAWAT",
    desc: "Emergency",
    iconColor: "text-rose-700",
    iconBg: "bg-rose-100",
    badgeBg: "bg-rose-800 text-white border-rose-800",
    icon: Siren,
    isEmergency: true,
  },
};

export const ClinicalGradeCard = ({ grade, count }) => {
  const config = GRADE_CONFIG[grade];

  if (!config) return null;

  const Icon = config.icon;

  return (
    <div
      className={`rounded-xl border p-5 shadow-xs transition-all ${
        config.isEmergency
          ? "border-rose-300 bg-rose-50/50"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-md uppercase border ${config.badgeBg}`}
        >
          {config.label}
        </span>
        <div className={`p-2 rounded-lg ${config.iconBg}`}>
          <Icon
            className={`h-4.5 w-4.5 ${
              config.isEmergency
                ? "text-rose-800 animate-pulse"
                : config.iconColor
            }`}
          />
        </div>
      </div>
      <div
        className={`font-bold tracking-tight text-gray-900 ${
          config.isEmergency ? "text-3xl" : "text-2xl"
        }`}
      >
        {count}
      </div>
      <p
        className={`text-xs mt-1.5 ${
          config.isEmergency
            ? "text-rose-800 font-semibold"
            : "text-gray-500 font-medium"
        }`}
      >
        Grade {grade}: {config.desc}
      </p>
    </div>
  );
};
