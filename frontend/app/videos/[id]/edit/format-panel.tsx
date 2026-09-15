"use client";

import type { VideoFormat } from "../../../lib/api";

type FormatPanelProps = {
  format: VideoFormat | null;
  onChange: (format: VideoFormat) => void;
};

export function FormatPanel({ format, onChange }: FormatPanelProps) {
  return (
    <div className="dashboard-card p-4">
      <p className="premium-kicker text-xs">Formato</p>

      <div className="dash-panel mt-3 inline-flex rounded-full border p-1">
        <button
          type="button"
          data-active={format === "SHORT"}
          onClick={() => onChange("SHORT")}
          className="premium-tab px-4 py-1.5 text-sm font-medium"
        >
          Shorts
        </button>
        <button
          type="button"
          data-active={format === "STANDARD"}
          onClick={() => onChange("STANDARD")}
          className="premium-tab px-4 py-1.5 text-sm font-medium"
        >
          Padrão
        </button>
      </div>
    </div>
  );
}
