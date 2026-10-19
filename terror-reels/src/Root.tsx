import {
  AbsoluteFill,
  Composition,
  Folder,
  Series,
  staticFile,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import { Hook } from "./scenes/Hook";
import { Psycho } from "./scenes/Psycho";
import { Halloween } from "./scenes/Halloween";
import { Exorcist } from "./scenes/Exorcist";
import { End } from "./scenes/End";
import t from "./timeline.json";
const Reel = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence
          name="Gancho"
          durationInFrames={t.scenes[0].frames}
          premountFor={fps}
        >
          <Hook />
        </Series.Sequence>
        <Series.Sequence
          name="Psicose"
          durationInFrames={t.scenes[1].frames}
          premountFor={fps}
        >
          <Psycho />
        </Series.Sequence>
        <Series.Sequence
          name="Halloween"
          durationInFrames={t.scenes[2].frames}
          premountFor={fps}
        >
          <Halloween />
        </Series.Sequence>
        <Series.Sequence
          name="O Exorcista"
          durationInFrames={t.scenes[3].frames}
          premountFor={fps}
        >
          <Exorcist />
        </Series.Sequence>
        <Series.Sequence
          name="Comentário e replay"
          durationInFrames={t.scenes[4].frames}
          premountFor={fps}
        >
          <End />
        </Series.Sequence>
      </Series>
      <Audio
        src={staticFile("audio/score.wav")}
        volume={(f) =>
          Math.min(0.23, (f / fps) * 0.23, ((t.totalFrames - f) / fps) * 0.23)
        }
        premountFor={fps}
      />
    </AbsoluteFill>
  );
};
export const RemotionRoot = () => (
  <>
    <Composition
      id="TerrorReels"
      component={Reel}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={t.totalFrames}
    />
    <Folder name="Cenas">
      <Composition
        id="Gancho"
        component={Hook}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={t.scenes[0].frames}
      />
      <Composition
        id="Psicose"
        component={Psycho}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={t.scenes[1].frames}
      />
      <Composition
        id="Halloween"
        component={Halloween}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={t.scenes[2].frames}
      />
      <Composition
        id="Exorcista"
        component={Exorcist}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={t.scenes[3].frames}
      />
      <Composition
        id="Final"
        component={End}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={t.scenes[4].frames}
      />
    </Folder>
  </>
);
