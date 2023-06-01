import { useState } from "react";
import PopupErro from "../../popUps/PopupErro";
import TestsDesktop from "./TestsDesktop/TestsDesktop";
import TestsMobile from "./TestsMobile/TestsMobile";

export default function Tests() {
  const [popup, setPopup] = useState(true);
  
  return (
    <section>
      <TestsMobile />
      <TestsDesktop />
      <div style={{
        height: "900px"
      }}>

      </div>
      <PopupErro
      descricao="dasda"
      onClose={() => setPopup(false)}
      titulo="asdas"
      visivel={popup}
      />

    </section>
  );
}