import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Theatre
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";

if (import.meta.env.DEV) {
	console.log("Dev mode!");
	studio.extend(extension);
	studio.initialize();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
