import {
  AbsoluteFill,
  Composition,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = { title: string; subtitle: string };

export const YoutubeIntro: React.FC<Props> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 85% 25%, #153c50 0%, #08131f 55%)",
        color: "#f5f5ed",
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: 150,
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -200,
          top: -320,
          width: 1100,
          height: 1100,
          border: "2px solid #2e6375",
          borderRadius: "50%",
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -80,
          top: -200,
          width: 860,
          height: 860,
          border: "2px solid #2e6375",
          borderRadius: "50%",
          opacity: 0.3,
        }}
      />
      <div
        style={{
          opacity: interpolate(
            frame,
            [0, fps, durationInFrames - fps, durationInFrames - 1],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
          translate: `0 ${interpolate(frame, [0, 1.3 * fps], [55, 0], { extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })}px`,
        }}
      >
        <div
          style={{
            color: "#b3f36c",
            fontSize: 30,
            letterSpacing: 8,
            fontWeight: 700,
            marginBottom: 40,
          }}
        >
          SEU CANAL • YOUTUBE
        </div>
        <h1
          style={{
            fontSize: 148,
            lineHeight: 1.06,
            letterSpacing: -7,
            maxWidth: 1540,
            margin: 0,
          }}
        >
          {title}
        </h1>
        <div
          style={{
            width: 110,
            height: 8,
            background: "#b3f36c",
            marginTop: 50,
            marginBottom: 40,
          }}
        />
        <p
          style={{
            fontSize: 48,
            lineHeight: 1.35,
            color: "#b7c9d5",
            maxWidth: 1420,
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 5,
          background: "#b3f36c",
          width: `${interpolate(frame, [0, durationInFrames - 1], [0, 100])}%`,
        }}
      />
    </AbsoluteFill>
  );
};

export const MyComposition = () => (
  <Composition
    id="YoutubeHorizontal"
    component={YoutubeIntro}
    width={1920}
    height={1080}
    fps={30}
    durationInFrames={300}
    defaultProps={{
      title: "Sua próxima ideia\ncomeça aqui.",
      subtitle: "Um novo olhar. Uma boa história. Seu primeiro vídeo.",
    }}
  />
);
