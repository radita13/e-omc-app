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
    color: "green",
    icon: Smile,
    bg: "bg-green-50",
    text: "text-green-600",
    border: "border-l-green-500",
  },
  1: {
    label: "Ringan",
    desc: "Gejala Awal",
    color: "yellow",
    icon: AlertCircle,
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-l-yellow-400",
  },
  2: {
    label: "Sedang",
    desc: "Butuh Perhatian",
    color: "orange",
    icon: AlertTriangle,
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-l-orange-500",
  },
  3: {
    label: "Berat",
    desc: "Intervensi Medis",
    color: "red",
    icon: XCircle,
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-l-red-500",
  },
  4: {
    label: "GAWAT",
    desc: "Emergency",
    color: "rose",
    icon: Siren,
    bg: "bg-rose-50/60",
    text: "text-rose-900",
    border: "border-l-rose-800",
    isEmergency: true,
  },
};

export const ClinicalGradeCard = ({ grade, count }) => {
  const config = GRADE_CONFIG[grade];

  if (!config) return null;

  const Icon = config.icon;

  return (
    <div
      className={`rounded-xl border bg-white p-5 shadow-sm border-l-4 ${config.border} ${config.isEmergency ? config.bg : ""}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-xs font-bold px-2 py-1 rounded uppercase ${config.isEmergency ? "bg-rose-800 text-white" : `${config.bg} ${config.text}`}`}
        >
          {config.label}
        </span>
        <Icon
          className={`h-5 w-5 ${config.isEmergency ? "text-rose-800 animate-pulse" : `text-${config.color}-500`}`}
        />
      </div>
      <div
        className={`font-bold text-gray-800 ${config.isEmergency ? "text-3xl" : "text-2xl"}`}
      >
        {count}
      </div>
      <p
        className={`text-xs mt-1 ${config.isEmergency ? "text-rose-700 font-semibold" : "text-gray-500"}`}
      >
        Grade {grade}: {config.desc}
      </p>
    </div>
  );
};
