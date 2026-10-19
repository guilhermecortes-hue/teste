import React from "react";
import {
  AbsoluteFill,
  CanvasImage,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import timeline from "./timeline.json";
import { Captions } from "./Captions";
export const Scene: React.FC<{ index: number }> = ({ index }) => {
  const s = timeline.scenes[index];
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accent = index === 2 ? "#ff9c52" : index === 3 ? "#b2ebed" : "#deff63";
  const reveal = spring({
    frame: f,
    fps,
    config: { damping: 17, stiffness: 125 },
  });
  return (
    <AbsoluteFill
      style={{
        background: "#080c12",
        color: "#f6f5ed",
        fontFamily: "Reel, Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <style>{`@font-face{font-family:Reel;src:url('${staticFile("font.ttf")}') format('truetype');font-weight:100 900}`}</style>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at ${40 + Math.sin(f / 90) * 10}% 48%,${index === 3 ? "#23433e" : "#3a211d"} 0%,#080c12 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.12,
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent 0px,transparent 4px,#fff 5px,transparent 6px)",
          translate: `0 ${f % 4}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 132,
          fontSize: 26,
          letterSpacing: 7,
          color: accent,
        }}
      >
        ARQUIVO DO MEDO /{" "}
        {index === 0 ? "ABERTO" : index === 4 ? "SUA VEZ" : `0${index}`}
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 205,
          right: 150,
          fontSize: 94,
          lineHeight: 1.04,
          fontWeight: 900,
          whiteSpace: "pre-line",
          letterSpacing: -5,
          translate: `0 ${(1 - reveal) * 65}px`,
          opacity: reveal,
        }}
      >
        {s.title}
      </div>
      <div
        style={{
          position: "absolute",
          top: 460,
          left: 84,
          right: 140,
          fontSize: index === 4 ? 25 : 29,
          letterSpacing: 2,
          color: accent,
        }}
      >
        {s.label}
      </div>
      {s.poster ? (
        <div
          style={{
            position: "absolute",
            top: 555,
            left: 235,
            width: 540,
            height: 810,
            rotate: `${Math.sin(f / 65) * 2}deg`,
            scale: interpolate(f, [0, s.frames], [0.94, 1.06]),
            boxShadow: "0 30px 90px #000",
          }}
        >
          <CanvasImage
            src={staticFile(`posters/${s.poster}.jpg`)}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            premountFor={fps}
          />
          <div
            style={{
              position: "absolute",
              right: -55,
              top: 580,
              background: accent,
              color: "#080c12",
              fontSize: 33,
              fontWeight: 900,
              padding: "16px 22px",
              rotate: "-8deg",
            }}
          >
            BASTIDOR {index}/3
          </div>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            top: 630,
            left: 95,
            width: 800,
            height: 680,
          }}
        >
          {["psycho", "halloween", "exorcist"].map((p, i) => (
            <CanvasImage
              key={p}
              src={staticFile(`posters/${p}.jpg`)}
              premountFor={fps}
              style={{
                position: "absolute",
                width: 350,
                height: 525,
                objectFit: "contain",
                left: i * 220,
                top: i === 1 ? 0 : 90,
                rotate: `${(i - 1) * 13 + Math.sin(f / 30) * 2}deg`,
                scale: 1 + Math.sin(f / 35 + i) * 0.02,
                boxShadow: "0 24px 80px #000",
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              top: 560,
              left: 0,
              right: 0,
              textAlign: "center",
              fontSize: 54,
              fontWeight: 900,
              color: accent,
            }}
          >
            {index === 0 ? "VOCÊ PERCEBEU?" : "COMENTA 1, 2 OU 3"}
          </div>
        </div>
      )}
      <Captions captions={s.captions} />
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 150,
          bottom: 220,
          height: 4,
          background: "#ffffff22",
        }}
      >
        <div
          style={{
            height: 4,
            width: `${(f / s.frames) * 100}%`,
            background: accent,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          bottom: 172,
          fontSize: 22,
          letterSpacing: 4,
          color: "#9ba3a9",
        }}
      >
        CINEMA · TRUQUES · BASTIDORES
      </div>
      {timeline.preview && (
        <div
          style={{
            position: "absolute",
            top: 55,
            left: 80,
            fontSize: 22,
            color: "#f4ac64",
          }}
        >
          PRÉVIA VISUAL · NARRAÇÃO A GERAR
        </div>
      )}
      <div
        style={{
          position: "absolute",
          height: 8,
          width: "100%",
          background: accent,
          top: 530 + ((f * 19) % 850),
          opacity: f < 5 ? 0.4 : 0,
        }}
      />
      {s.voice && (
        <Audio src={staticFile(s.voice)} volume={1} premountFor={fps} />
      )}
      <Audio src={staticFile("audio/hit.wav")} volume={0.4} premountFor={fps} />
      <Sequence
        from={Math.max(0, s.frames - 16)}
        durationInFrames={16}
        premountFor={fps}
      >
        <Audio
          src={staticFile("audio/whoosh.wav")}
          volume={0.24}
          premountFor={fps}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
