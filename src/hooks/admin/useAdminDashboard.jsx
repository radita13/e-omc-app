"use client";

import { useEffect, useState } from "react";
import {
  getDashboardStats,
  getAssessmentTimeline,
} from "@/services/adminService";

export function useAdminDashboard() {
  const [stats, setStats] = useState(null);
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [statsRes, timelineRes] = await Promise.all([
          getDashboardStats(),
          getAssessmentTimeline(),
        ]);

        if (statsRes.success) setStats(statsRes.data);
        else setError(statsRes.error);

        if (timelineRes.success) setTimelineData(timelineRes.data);
        else setError(timelineRes.error);
      } catch (err) {
        setError("Gagal memuat data dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { stats, timelineData, loading, error };
}
