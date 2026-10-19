import React from "react";
import type { Caption } from "@remotion/captions";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const Captions: React.FC<{ captions: Caption[] }> = ({ captions }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  const active = captions.findIndex(
    (caption, index) =>
      ms >= caption.startMs &&
      ms < (captions[index + 1]?.startMs ?? caption.endMs),
  );

  if (active < 0) return null;

  const start = Math.floor(active / 3) * 3;

  return (
    <div
      style={{
        position: "absolute",
        top: 1440,
        left: 90,
        right: 150,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        columnGap: 18,
        rowGap: 14,
        textAlign: "center",
        fontSize: 58,
        fontWeight: 900,
        lineHeight: 1.32,
      }}
    >
      {captions.slice(start, start + 3).map((caption, index) => {
        const highlighted = start + index === active;

        return (
          <span
            key={start + index}
            style={{
              flex: "0 0 auto",
              whiteSpace: "nowrap",
              padding: "6px 12px",
              background: highlighted ? "#deff63" : "#070b10",
              color: highlighted ? "#070b10" : "#fff",
              borderRadius: 6,
              boxShadow: "0 4px 24px #000",
            }}
          >
            {caption.text.trim()}
          </span>
        );
      })}
    </div>
  );
};
