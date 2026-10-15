import { VideoDinamicoComposition } from "./VideoDinamico";
import { QuandoTudoComecouComposition } from "./QuandoTudoComecou";
import { CalendarComposition } from "./Calendar";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <VideoDinamicoComposition />
      <QuandoTudoComecouComposition />
      <CalendarComposition />
      <MyComposition />
    </>
  );
};
