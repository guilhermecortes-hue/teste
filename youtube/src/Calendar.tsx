import {
  AbsoluteFill,
  Composition,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const Calendar = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Hold the first month, turn all 60 pages, then hold October 2026.
  const progress = interpolate(frame, [1.2 * fps, 8.2 * fps], [0, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const offset = Math.floor(progress);
  const monthIndex = (9 + offset) % 12;
  const year = 2021 + Math.floor((9 + offset) / 12);
  const firstDay =
    (new Date(Date.UTC(year, monthIndex, 1)).getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
  const turning = progress > 0 && progress < 60;
  const phase = progress % 1;

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 35%, #9754e3 0%, #7032b0 52%, #4e1c84 100%)",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, Helvetica, sans-serif",
        perspective: 1800,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 1120,
          height: 40,
          bottom: 112,
          borderRadius: "50%",
          background: "#2c094f",
          filter: "blur(35px)",
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: "relative",
          width: 1050,
          height: 770,
          borderRadius: 28,
          background: "#d8cbe5",
          boxShadow:
            "0 14px 0 -4px #e2d8ec, 0 26px 0 -9px #c9b4dd, 0 45px 90px #30104c66",
          opacity: interpolate(frame, [0, 0.6 * fps], [0, 1], {
            extrapolateRight: "clamp",
          }),
          translate: `0 ${interpolate(frame, [0, 0.8 * fps], [55, 0], { extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })}px`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#fcf9ff",
            borderRadius: 28,
            overflow: "hidden",
            transformOrigin: "50% 0%",
            transform: turning
              ? `rotateX(${-Math.sin(phase * Math.PI) * 9}deg)`
              : undefined,
          }}
        >
          <div
            style={{
              height: 225,
              background: "#351054",
              color: "#fff",
              padding: "54px 64px 30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "5px solid #b989ee",
            }}
          >
            <div style={{ fontSize: 86, fontWeight: 700, letterSpacing: -3 }}>
              {months[monthIndex]}
            </div>
            <div
              style={{
                fontSize: 106,
                fontWeight: 700,
                letterSpacing: -5,
                color: "#d9b8ff",
              }}
            >
              {year}
            </div>
          </div>
          <div style={{ padding: "30px 48px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                textAlign: "center",
                color: "#9876af",
                fontSize: 23,
                fontWeight: 700,
                letterSpacing: 2,
                marginBottom: 18,
              }}
            >
              {["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gridTemplateRows: "repeat(6, 63px)",
                textAlign: "center",
                alignItems: "center",
                fontSize: 39,
                color: "#382049",
                fontWeight: 500,
              }}
            >
              {Array.from({ length: 42 }, (_, cell) => {
                const day = cell - firstDay + 1;
                return (
                  <div
                    key={cell}
                    style={{ color: cell % 7 > 4 ? "#9973b3" : undefined }}
                  >
                    {day > 0 && day <= days ? day : ""}
                  </div>
                );
              })}
            </div>
          </div>
          {turning ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background: `linear-gradient(180deg, transparent 20%, rgba(62, 19, 89, ${Math.sin(phase * Math.PI) * 0.14}) 100%)`,
              }}
            />
          ) : null}
        </div>
        <div
          style={{
            position: "absolute",
            top: -28,
            left: 170,
            width: 22,
            height: 66,
            borderRadius: 12,
            background: "linear-gradient(90deg, #9582a5, #f7f0ff 45%, #a99ab5)",
            boxShadow: "3px 4px 5px #19072855",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -28,
            right: 170,
            width: 22,
            height: 66,
            borderRadius: 12,
            background: "linear-gradient(90deg, #9582a5, #f7f0ff 45%, #a99ab5)",
            boxShadow: "3px 4px 5px #19072855",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

export const CalendarComposition = () => (
  <Composition
    id="Calendario"
    component={Calendar}
    width={1920}
    height={1080}
    fps={30}
    durationInFrames={300}
  />
);
