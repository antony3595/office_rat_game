export const formatSeconds = (totalSeconds: number): string => {
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	const pad = (num: number) => num.toString().padStart(2, "0");

	let result = "";

	if (hours > 0) {
		result += `${hours} час${hours === 1 ? "" : [2, 3, 4].includes(hours) ? "а" : "ов"} `;
	}
	if (minutes > 0 || hours > 0) {
		result += `${pad(minutes)} мин `;
	}
	result += `${pad(seconds)} сек`;

	return result.trim();
};
