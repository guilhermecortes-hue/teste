import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  Composition,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const VideoDinamico = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = interpolate(
    frame,
    [0.3 * fps, 0.8 * fps, 2.8 * fps, 3.2 * fps],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const segment =
    frame < 3.3 * fps ? 0 : frame < 6.5 * fps ? 1 : frame < 9.6 * fps ? 2 : 3;
  const from = [0, 3.3, 6.5, 9.6][segment] * fps;
  const until = [3.3, 6.5, 9.6, 13.3][segment] * fps;
  const zoom = interpolate(
    frame,
    [from, until],
    [
      [1, 1.09],
      [1.13, 1.06],
      [1, 1.07],
      [1.04, 1],
    ][segment],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    },
  );
  const accent = interpolate(frame - from, [0, 5, 16], [0, 0.18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        background: "#351054",
        overflow: "hidden",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <Video
        name="Fala original"
        objectFit="cover"
        src={staticFile("clipes/lab-sin.mp4")}
        premountFor={fps}
        style={{
          width: "100%",
          height: "100%",
          scale: zoom,
          transformOrigin: "50% 30%",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(0deg, #22073d88, transparent 28%, transparent 85%, #22073d33)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 30,
          background: "linear-gradient(180deg, #bb82fa, #6d28a6)",
          opacity: 0.85,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, #d4a6ff, transparent 40%, transparent 70%, #9c54d9)",
          opacity: accent,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 100,
          bottom: 100,
          opacity: title,
          translate: `${interpolate(frame, [0.3 * fps, 1 * fps], [-100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })}px 0`,
          display: "flex",
          alignItems: "center",
          gap: 26,
        }}
      >
        <div
          style={{
            width: 8,
            height: 100,
            background: "#d8b4ff",
            boxShadow: "0 0 24px #a362ed",
          }}
        />
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: 4,
            color: "white",
            textShadow: "0 4px 15px #0008",
          }}
        >
          LAB SIN
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 75,
          top: 75,
          width: 95,
          height: 95,
          borderTop: "4px solid #ddbbff",
          borderRight: "4px solid #ddbbff",
          opacity: interpolate(frame, [0, fps], [0, 0.8], {
            extrapolateRight: "clamp",
          }),
          translate: `0 ${Math.sin(frame / fps) * 5}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 6,
          width: `${(frame / 397) * 100}%`,
          background: "linear-gradient(90deg, #7b35bf, #ddb5ff)",
        }}
      />
    </AbsoluteFill>
  );
};
export const VideoDinamicoComposition = () => (
  <Composition
    id="VideoDinamico"
    component={VideoDinamico}
    width={1920}
    height={1080}
    fps={30}
    durationInFrames={398}
  />
);
