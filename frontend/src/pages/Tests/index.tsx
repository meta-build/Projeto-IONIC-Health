import TestsDesktop from "./TestsDesktop";
import TestsMobile from "./TestsMobile";

export default function Tests() {
  return (
    <section>
      <TestsMobile />
      <TestsDesktop />
    </section>
  );
}