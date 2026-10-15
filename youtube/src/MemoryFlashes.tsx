import {
  AbsoluteFill,
  CanvasImage,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import photos from "../public/memorias/manifest.json";

export const MemoryFlashes = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = 0.7 * fps;
  const end = 9.3 * fps;
  const slot = (end - start) / photos.length;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {photos.map((photo, index) => {
        const local = frame - start - index * slot;
        const opacity = interpolate(
          local,
          [-2, 2, slot - 2, slot + 2],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        if (!opacity) return null;
        return (
          <AbsoluteFill key={photo.file} style={{ opacity }}>
            <CanvasImage
              src={staticFile(photo.file)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.32,
                scale: interpolate(local, [0, slot], [1.02, 1.07], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            />
            <AbsoluteFill
              style={{
                background:
                  "linear-gradient(90deg, #4e1c8455, #7032b0bb 40%, #7032b0bb 60%, #4e1c8455)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: index % 2 === 0 ? 38 : undefined,
                right: index % 2 === 1 ? 38 : undefined,
                top: index % 2 === 0 ? 220 : 300,
                width: 350,
                height: 500,
                padding: 10,
                background: "#f5e9ff",
                borderRadius: 12,
                boxShadow: "0 20px 60px #270b4d66",
                rotate: index % 2 === 0 ? "-5deg" : "5deg",
                translate: `0 ${interpolate(local, [0, slot], [22, -12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px`,
              }}
            >
              <CanvasImage
                src={staticFile(photo.file)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  background: "#e4d6ef",
                  borderRadius: 5,
                }}
              />
            </div>
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
