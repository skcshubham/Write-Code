import React, { useState } from "react";
// codemirror default styles and material theme
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
// importing languages that editor is going to use
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/css/css";
// importing editor component which we can control input and output with onChange event handler
import { Controlled as ControlledEditor } from "react-codemirror2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons";

function Editor(props) {
	// destructuring from passed props
	const { language, displayName, value, onChange } = props;

	// state to open and close tabs of editor
	const [open, setOpen] = useState(true);

	function handleChange(editr, data, value) {
		onChange(value);
	}

	return (
		<React.Fragment>
			<div className={`Editor-container ${open === true ? "" : "collapsed"}`}>
				<div className="Editor-title">
					{displayName}
					<button
						className="expand-collapse-btn"
						onClick={() => setOpen((prevOpen) => !prevOpen)}
					>
						<FontAwesomeIcon
							icon={open === true ? faCompressAlt : faExpandAlt}
						/>
					</button>
				</div>
				<ControlledEditor
					onBeforeChange={handleChange}
					value={value}
					className="code-mirror-wrapper"
					options={{
						lineWrapping: true,
						lint: true,
						mode: language,
						theme: "material",
						lineNumbers: true,
					}}
				/>
			</div>
		</React.Fragment>
	);
}

export default Editor;
