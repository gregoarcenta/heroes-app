import {createRoot} from "react-dom/client";
import {StrictMode} from "react";

import {HeroesApp} from "./HeroesApp";

import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <HeroesApp/>
    </StrictMode>
);
