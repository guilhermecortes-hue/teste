import {
  AbsoluteFill,
  CanvasImage,
  Composition,
  Easing,
  interpolate,
  random,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const Trophy = ({ side }: { side: "left" | "right" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        top: 425,
        [side]: 95,
        opacity: interpolate(frame, [0.6 * fps, 1.4 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: `0 ${interpolate(frame, [0.6 * fps, 1.6 * fps], [60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })}px`,
        filter: "drop-shadow(0 18px 26px #290a5988)",
      }}
    >
      <svg width="230" height="310" viewBox="0 0 230 310">
        <defs>
          <linearGradient id={`gold-${side}`}>
            <stop stopColor="#ae6914" />
            <stop offset=".32" stopColor="#ffe6a0" />
            <stop offset=".58" stopColor="#ffd059" />
            <stop offset="1" stopColor="#bd7c21" />
          </linearGradient>
        </defs>
        <g fill={`url(#gold-${side})`} stroke="#ffe5a0" strokeWidth="5">
          <path d="M54 37H15v40q0 66 70 70v-23q-45-3-45-47V62h20Z" />
          <path d="M176 37h39v40q0 66-70 70v-23q45-3 45-47V62h-20Z" />
          <path d="M53 23h124l-9 82q-5 62-53 65-48-3-53-65Z" />
          <path d="M103 166h24v61l34 14v15H69v-15l34-14Z" />
        </g>
        <path
          d="m115 57 9 19 21 3-15 15 3 21-18-10-18 10 3-21-15-15 21-3Z"
          fill="#fff0bf"
        />
        <rect
          x="55"
          y="256"
          width="120"
          height="33"
          rx="5"
          fill="#30104f"
          stroke="#dbad52"
          strokeWidth="3"
        />
        <rect x="84" y="265" width="62" height="13" rx="2" fill="#e7bd65" />
      </svg>
    </div>
  );
};

export const ReconhecidoNacionalmente = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 35%, #9754e3 0%, #7032b0 52%, #4e1c84 100%)",
        fontFamily: "Arial, Helvetica, sans-serif",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Confetes ficam atrás das logos: lançamento do centro para as laterais. */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {Array.from({ length: 140 }, (_, i) => {
          const start = (0.8 + Math.floor(i / 35) * 2) * fps;
          const t = (frame - start) / fps;
          if (t < 0 || t > 4.2) return null;
          const direction = i % 2 === 0 ? -1 : 1;
          const x =
            960 + direction * (150 + (210 + random(`vx-${i}`) * 170) * t);
          const y = 630 - (330 + random(`vy-${i}`) * 350) * t + 160 * t * t;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: 8 + random(`w-${i}`) * 9,
                height: 8 + random(`h-${i}`) * 15,
                background: [
                  "#ffe29b",
                  "#fff5dd",
                  "#d7a0ff",
                  "#f6be56",
                  "#f7c5ec",
                ][i % 5],
                borderRadius: i % 4 === 0 ? "50%" : 1,
                rotate: `${random(`r-${i}`) * 360 + t * (i % 2 ? 240 : -260)}deg`,
                opacity: interpolate(t, [0, 0.12, 3.4, 4.2], [0, 1, 1, 0]),
              }}
            />
          );
        })}
      </AbsoluteFill>
      <Trophy side="left" />
      <Trophy side="right" />
      <div
        style={{
          position: "absolute",
          top: 320,
          width: 1120,
          height: 600,
          padding: 32,
          boxSizing: "border-box",
          border: "2px solid #e4b9ff55",
          borderRadius: 24,
          overflow: "hidden",
          background: "#351054",
          boxShadow: "0 25px 80px #2e0d6077, 0 0 40px #e8be661a",
          scale: interpolate(
            frame,
            [0, 1.5 * fps, durationInFrames - 1],
            [0.76, 0.93, 1],
            {
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.22, 1, 0.36, 1),
            },
          ),
          opacity: interpolate(frame, [0, 0.65 * fps], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CanvasImage
          src={staticFile("reconhecimento/logos-premios.png")}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
      <h1
        style={{
          position: "absolute",
          top: 85,
          margin: 0,
          width: "100%",
          textAlign: "center",
          color: "#fff6e5",
          fontSize: 82,
          letterSpacing: -2,
          fontWeight: 700,
          textShadow: "0 4px 26px #35105466",
          opacity: interpolate(frame, [0, 0.7 * fps], [0, 1], {
            extrapolateRight: "clamp",
          }),
          translate: `0 ${interpolate(frame, [0, 0.9 * fps], [25, 0], { extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })}px`,
        }}
      >
        Reconhecido nacionalmente
      </h1>
    </AbsoluteFill>
  );
};

export const ReconhecidoNacionalmenteComposition = () => (
  <Composition
    id="ReconhecidoNacionalmente"
    component={ReconhecidoNacionalmente}
    width={1920}
    height={1080}
    fps={30}
    durationInFrames={300}
  />
);
