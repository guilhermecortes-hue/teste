import { QuandoTudoComecouComposition } from "./QuandoTudoComecou";
import { CalendarComposition } from "./Calendar";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <QuandoTudoComecouComposition />
      <CalendarComposition />
      <MyComposition />
    </>
  );
};
