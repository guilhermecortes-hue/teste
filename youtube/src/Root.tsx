import { OQueAindaVemComposition } from "./OQueAindaVem";
import { QuandoTudoComecouComposition } from "./QuandoTudoComecou";
import { CalendarComposition } from "./Calendar";
import { MyComposition } from "./Composition";
import { ReconhecidoNacionalmenteComposition } from "./ReconhecidoNacionalmente";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <OQueAindaVemComposition />
      <ReconhecidoNacionalmenteComposition />
      <QuandoTudoComecouComposition />
      <CalendarComposition />
      <MyComposition />
    </>
  );
};
