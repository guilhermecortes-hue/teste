import { Audio } from "@remotion/media";
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
const cards = [1, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 15, 14].map(
  (number) => `proximos-cards/${String(number).padStart(2, "0")}.png`,
);

export const OQueAindaVem = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const vertical = height > width;
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
      {cards.map((src, i) => (
        <Audio
          key={`pop-${src}`}
          name={`Pop ${src}`}
          src={staticFile("sfx/card-pop.wav")}
          from={start + i * slot + Math.round((8 / 30) * fps)}
          durationInFrames={Math.ceil(0.3 * fps)}
          premountFor={fps}
          volume={0.8}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: (vertical ? 1700 : 1300) + i * 400,
            height: (vertical ? 1700 : 1300) + i * 400,
            left: width / 2 - ((vertical ? 1700 : 1300) + i * 400) / 2,
            top: height / 2 - ((vertical ? 1700 : 1300) + i * 400) / 2,
            border: "1px solid #ffffff12",
            borderRadius: "50%",
            scale: interpolate(frame, [0, 25 * fps], [0.95, 1.08], clamp),
          }}
        />
      ))}
      {cards.map((src, i) => {
        const local =
          i === cards.length - 1
            ? Math.min(frame - start - i * slot, slot - 8)
            : frame - start - i * slot;
        if (local < 0 || local > slot) return null;
        return (
          <AbsoluteFill
            key={`glow-${src}`}
            style={{
              pointerEvents: "none",
              opacity: interpolate(
                local,
                [0, 8, slot - 8, slot],
                [0, 0.95, 0.75, 0],
                clamp,
              ),
              background: vertical
                ? "radial-gradient(ellipse 610px 900px at 50% 49%, #fff9daaa 0%, #ffe8a666 40%, #edb5ff44 65%, transparent 100%)"
                : "radial-gradient(ellipse 720px 650px at 50% 52%, #fff9daaa 0%, #ffe8a666 40%, #edb5ff44 65%, transparent 100%)",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: vertical ? 55 : 510,
                top: vertical ? 260 : 85,
                width: vertical ? 970 : 900,
                height: vertical ? 1350 : 920,
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse at center, transparent 35%, #fff3d533 55%, transparent 72%)",
                scale: interpolate(local, [0, slot], [0.85, 1.15], clamp),
              }}
            />
            {[0, 1, 2, 3].map((sparkle) => (
              <div
                key={sparkle}
                style={{
                  position: "absolute",
                  left: (vertical
                    ? [55, 980, 35, 1000]
                    : [530, 1370, 470, 1430])[sparkle],
                  top: (vertical
                    ? [450, 1180, 1260, 560]
                    : [230, 730, 770, 290])[sparkle],
                  width: vertical ? 28 : 34,
                  height: vertical ? 28 : 34,
                  background: "#fff6ce",
                  clipPath:
                    "polygon(50% 0%, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0% 50%, 40% 40%)",
                  scale: interpolate(
                    local,
                    [0, 10, slot - 8, slot],
                    [0.2, 1.1, 0.7, 0.2],
                    clamp,
                  ),
                }}
              />
            ))}
          </AbsoluteFill>
        );
      })}
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
            fontSize: vertical ? 94 : 100,
            maxWidth: vertical ? 880 : undefined,
            lineHeight: vertical ? 1.18 : undefined,
            fontWeight: 700,
            letterSpacing: -3,
            textShadow: "0 8px 36px #35105466",
          }}
        >
          {vertical ? (
            <>
              O que ainda vem
              <br />
              por ai....
            </>
          ) : (
            "O que ainda vem por ai...."
          )}
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
          top: vertical ? 230 : 34,
          left: vertical ? 100 : 0,
          width: vertical ? 880 : "100%",
          textAlign: "center",
          color: "#fff6ff",
          fontSize: vertical ? 48 : 34,
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
              left: vertical ? 100 : 620,
              top: vertical ? 380 : 110,
              width: vertical ? 880 : 680,
              height: vertical ? 1100 : 850,
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
          bottom: vertical ? 340 : 43,
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

export const OQueAindaVemVerticalComposition = () => (
  <Composition
    id="OQueAindaVemVertical"
    component={OQueAindaVem}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={750}
  />
);
