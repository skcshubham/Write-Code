import { useEffect, useState } from "react";

// to know which app is using local storage
const PREFIX = "write-code-project-";

// initial value is the default state in our text editor
function useLocalStorage(key, initialValue) {
	const prefixedKey = PREFIX + key;

	// using function form of useState because
	// getting data from LocalStoage is slow and we'll do it only once
	const [value, setValue] = useState(() => {
		// get data is JSON value
		const jsonValue = localStorage.getItem(prefixedKey);
		// if data exists, we return the parsed version of it
		if (jsonValue != null) return JSON.parse(jsonValue);

		// if we dont have initial value, we'll return initial value
		if (typeof initialValue === "function") {
			return initialValue();
		} else {
			return initialValue;
		}
	});

	// If our data changes, we'll store the data into local storage as stringified version
	useEffect(() => {
		localStorage.setItem(prefixedKey, JSON.stringify(value));
	}, [prefixedKey, value]);

	return [value, setValue];
}

export default useLocalStorage;
