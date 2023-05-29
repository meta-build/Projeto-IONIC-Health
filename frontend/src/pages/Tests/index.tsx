import TestsDesktop from "./TestsDesktop/TestsDesktop";
import TestsMobile from "./TestsMobile/TestsMobile";

export default function Tests() {
  return (
    <section>
      <TestsMobile />
      <TestsDesktop />
    </section>
  );
}