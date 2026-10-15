import {
  AbsoluteFill,
  CanvasImage,
  Composition,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const QuandoTudoComecou = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 35%, #9754e3 0%, #7032b0 52%, #4e1c84 100%)",
        fontFamily: "Arial, Helvetica, sans-serif",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          position: "absolute",
          top: 70,
          margin: 0,
          color: "#fff6ff",
          fontSize: 82,
          fontWeight: 700,
          letterSpacing: -2,
          textShadow: "0 4px 26px #35105455",
          opacity: interpolate(frame, [0, 0.7 * fps], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        Quando tudo começou...
      </h1>
      <div
        style={{
          position: "absolute",
          top: 255,
          width: 930,
          height: 697.5,
          borderRadius: 12,
          overflow: "hidden",
          border: "6px solid #f5e8ff",
          boxShadow: "0 30px 85px #2e0d6066",
          scale: interpolate(
            frame,
            [0, 1.4 * fps, 2.2 * fps, 5.8 * fps, durationInFrames - 1],
            [0.68, 1.02, 0.97, 1.035, 1.1],
            {
              easing: Easing.bezier(0.22, 1, 0.36, 1),
              extrapolateRight: "clamp",
            },
          ),
          rotate: interpolate(
            frame,
            [0, 1.4 * fps, 2.2 * fps, 5.8 * fps, durationInFrames - 1],
            ["-4deg", "0.8deg", "-0.4deg", "0.3deg", "0deg"],
            {
              easing: Easing.bezier(0.22, 1, 0.36, 1),
              extrapolateRight: "clamp",
            },
          ),
          translate: interpolate(
            frame,
            [0, 1.4 * fps, 2.2 * fps, durationInFrames - 1],
            ["0px 95px", "0px -10px", "0px 3px", "0px 0px"],
            {
              easing: Easing.bezier(0.22, 1, 0.36, 1),
              extrapolateRight: "clamp",
            },
          ),
          transformOrigin: "50% 50%",
          opacity: interpolate(frame, [0, 0.6 * fps], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CanvasImage
          src={staticFile("memorias/foto-01.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    </AbsoluteFill>
  );
};

export const QuandoTudoComecouComposition = () => (
  <Composition
    id="QuandoTudoComecou"
    component={QuandoTudoComecou}
    width={1920}
    height={1080}
    fps={30}
    durationInFrames={300}
  />
);
