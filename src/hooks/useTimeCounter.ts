import { useEffect, useState } from "react";

export const useTimeCounter = (startTime: number | null, stop: boolean = false) => {
	const [timeCounter, setTimeCounter] = useState(startTime);
	useEffect(() => {
		setTimeCounter(startTime);
	}, [startTime]);

	useEffect(() => {
		if (timeCounter !== null && !stop && startTime !== null) {
			setTimeout(() => {
				setTimeCounter((timeCounter || 0) + 1);
			}, 1000);
		} else if (stop) {
			setTimeCounter(startTime);
		}
	}, [startTime, stop, timeCounter]);
	return timeCounter;
};
