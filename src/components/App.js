import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";
import Annotation from "./Annotation";

function App() {
	// Hooks for storing state in functional components. initially we set state to empty as out code is empty
	const [html, setHtml] = useLocalStorage("html", "");
	const [css, setCss] = useLocalStorage("css", "");
	const [js, setJs] = useLocalStorage("js", "");
	const [srcDoc, setSrcDoc] = useState("");
	let annotate = true;

	if (html !== "" || css !== "" || js !== "") {
		annotate = false;
	}

	// we set a timeout of 100 ms because our code editor will refresh
	// after every change in code editor and hence it may cause overhead

	useEffect(() => {
		const timeout = setTimeout(() => {
			// code which renders in bottom pane is stored here
			// we put this variable in iframe as srcDoc
			setSrcDoc(`
			<!DOCTYPE html>
      <html lang="en">
      <head>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script> ${js} </script>
      </body>
      </html>
			`);
		}, 1000);

		return () => clearTimeout(timeout);
	}, [html, css, js]);

	return (
		<React.Fragment>
			{/* for the top html, css and js columns*/}
			<div className="pane top-pane">
				<Editor
					language="xml"
					displayName="HTML"
					value={html}
					onChange={setHtml}
				/>
				<Editor
					language="css"
					displayName="CSS"
					value={css}
					onChange={setCss}
				/>
				<Editor
					language="javascript"
					displayName="JavaScript"
					value={js}
					onChange={setJs}
				/>
			</div>

			{/* for the bottom result view pane*/}

			<div className="pane bottom-pane">
				{annotate ? <Annotation /> : ""}

				<div className="pane">
					{/** Inline frame or iframe is used to embed
					 * another document within the current HTML document. */}
					<iframe
						srcDoc={srcDoc}
						title="output"
						sandbox="allow-scripts" // for security does not allow malicious code which access cookies or etc
						frameBorder="0"
						width="100%"
						height="100%"
					/>
				</div>
			</div>
		</React.Fragment>
	);
}

export default App;
