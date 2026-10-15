import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import captions from "./palavras.json";

export const PalavrasAnimadas = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const now = (frame / fps) * 1000;
  const cue = captions.find((c) => now >= c.startMs && now < c.endMs);
  if (!cue) return null;
  const t = ((now - cue.startMs) / 1000) * fps;
  const remaining = ((cue.endMs - now) / 1000) * fps;
  const words =
    cue.text === "INSUBSTITUÍVEIS" ? ["", cue.text] : cue.text.split(" ");
  return (
    <div
      style={{
        position: "absolute",
        left: 105,
        bottom: 105,
        maxWidth: 1720,
        opacity: Math.min(
          interpolate(t, [0, 3], [0, 1], { extrapolateRight: "clamp" }),
          interpolate(remaining, [0, 3], [0, 1], { extrapolateRight: "clamp" }),
        ),
        translate: `0 ${interpolate(t, [0, 5, 10], [95, -8, 0], { extrapolateRight: "clamp" })}px`,
        rotate: interpolate(t, [0, 6, 12], ["-3deg", "0.6deg", "0deg"], {
          extrapolateRight: "clamp",
        }),
        scale: interpolate(t, [0, 5, 10], [0.78, 1.035, 1], {
          extrapolateRight: "clamp",
        }),
        transformOrigin: "0% 100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-20px -35px",
          background:
            "linear-gradient(90deg, #250735ee, #391051c9 80%, #39105100)",
          borderLeft: "7px solid #e9c9ff",
          borderRadius: 12,
          boxShadow: "0 15px 50px #0005",
        }}
      />
      {words[0] ? (
        <div
          style={{
            position: "relative",
            color: "white",
            fontSize: 57,
            letterSpacing: 5,
            fontWeight: 700,
            marginBottom: 5,
            textShadow: "0 3px 15px #0008",
          }}
        >
          {words[0]}
        </div>
      ) : null}
      <div
        style={{
          position: "relative",
          color: "#ffe6a0",
          fontSize: words[1].length > 13 ? 102 : 120,
          lineHeight: 1.08,
          letterSpacing: -2,
          fontWeight: 900,
          textShadow: "0 0 28px #b46bff88, 0 5px 15px #0008",
          translate: `${interpolate(t, [0, 5, 11], [100, -10, 0], { extrapolateRight: "clamp" })}px 0`,
        }}
      >
        {words[1]}
      </div>
      <div
        style={{
          position: "relative",
          width: `${interpolate(t, [3, 13], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
          height: 5,
          marginTop: 12,
          background: "linear-gradient(90deg, #ffe6a0, #d7a4ff, transparent)",
          boxShadow: "0 0 15px #d7a4ff",
        }}
      />
    </div>
  );
};
