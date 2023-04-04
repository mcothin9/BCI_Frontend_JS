import {createRoot} from "react-dom/client";
import Hello from "./Hello";
import React from "react";

// const helloDiv = document.createElement("div");
// helloDiv.innerHTML = "Hello from Javascript!";
// document.body.append(helloDiv);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Hello />);