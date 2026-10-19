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

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const cards = Array.from(
  { length: 16 },
  (_, i) => `proximos-cards/${String(i + 1).padStart(2, "0")}.png`,
);

export const OQueAindaVem = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = Math.round(3.1333333333 * fps);
  const slot = Math.round((25 * fps - start) / cards.length);
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 35%, #9754e3 0%, #7032b0 52%, #4e1c84 100%)",
        fontFamily: "Arial, Helvetica, sans-serif",
        overflow: "hidden",
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 1300 + i * 400,
            height: 1300 + i * 400,
            left: 960 - (1300 + i * 400) / 2,
            top: 540 - (1300 + i * 400) / 2,
            border: "1px solid #ffffff12",
            borderRadius: "50%",
            scale: interpolate(frame, [0, 25 * fps], [0.95, 1.08], clamp),
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: interpolate(
            frame,
            [0, 0.5 * fps, 2.6 * fps, 3.1 * fps],
            [0, 1, 1, 0],
            clamp,
          ),
          scale: interpolate(frame, [0, 3.1 * fps], [0.93, 1.025], clamp),
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "#fff6ff",
            fontSize: 100,
            fontWeight: 700,
            letterSpacing: -3,
            textShadow: "0 8px 36px #35105466",
          }}
        >
          O que ainda vem por ai....
          <div
            style={{
              width: 180,
              height: 5,
              background: "#f4d77d",
              margin: "36px auto 0",
              borderRadius: 5,
            }}
          />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 34,
          width: "100%",
          textAlign: "center",
          color: "#fff6ff",
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: 1,
          opacity: interpolate(frame, [2.8 * fps, 3.3 * fps], [0, 1], clamp),
        }}
      >
        O que ainda vem por ai....
      </div>
      {cards.map((src, i) => {
        const local =
          i === cards.length - 1
            ? Math.min(frame - start - i * slot, slot - 8)
            : frame - start - i * slot;
        if (local < -12 || local > slot + 12) return null;
        return (
          <div
            key={src}
            style={{
              position: "absolute",
              left: 620,
              top: 110,
              width: 680,
              height: 850,
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 24px 65px #260a5466",
              opacity: interpolate(
                local,
                [-12, 0, 8, slot - 8, slot, slot + 12],
                [0, 0.45, 1, 1, 0.45, 0],
                clamp,
              ),
              translate: interpolate(
                local,
                [-12, 0, 8, slot - 8, slot, slot + 12],
                [
                  "1100px 0px",
                  "850px 0px",
                  "0px 0px",
                  "0px 0px",
                  "-850px 0px",
                  "-1100px 0px",
                ],
                { ...clamp, easing: Easing.bezier(0.22, 1, 0.36, 1) },
              ),
              scale: interpolate(
                local,
                [-12, 0, 8, slot - 8, slot, slot + 12],
                [0.65, 0.72, 1, 1, 0.72, 0.65],
                clamp,
              ),
              zIndex: Math.abs(local - slot / 2) < slot / 2 ? 2 : 1,
            }}
          >
            <CanvasImage
              src={staticFile(src)}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          bottom: 43,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 12,
          opacity: interpolate(frame, [3 * fps, 3.5 * fps], [0, 1], clamp),
        }}
      >
        {cards.map((_, i) => (
          <div
            key={i}
            style={{
              height: 5,
              width:
                frame >= start + i * slot && frame < start + (i + 1) * slot
                  ? 42
                  : 16,
              borderRadius: 5,
              background:
                frame >= start + i * slot && frame < start + (i + 1) * slot
                  ? "#ffe88d"
                  : "#ffffff55",
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const OQueAindaVemComposition = () => (
  <Composition
    id="OQueAindaVem"
    component={OQueAindaVem}
    width={1920}
    height={1080}
    fps={30}
    durationInFrames={750}
  />
);
