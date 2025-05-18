export const encodeImageFileAsURL = (element: File | null, onResult: (result: string | null) => void) => {
	const reader = new FileReader();
	reader.onload = function () {
		if (typeof reader.result === "string") {
			onResult(reader.result);
		}
	};
	element && reader.readAsDataURL(element);
};

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getPercents = (partialValue: number, totalValue: number, decimalPlaces = 2): string => {
	const percents = (100 * partialValue) / totalValue;
	return !isNaN(percents) ? percents.toFixed(decimalPlaces) : "0";
};

export const stripHtmlTags = (str: string): string => {
	return str.replaceAll(/<\/?[^>]+(>|$)/gi, "").replaceAll("&nbsp;", "");
};

export const dotsSubstring = (str: string, start: number, end: number | undefined): string => {
	const substring = str.substring(start, end);
	const sliced = str.length > substring.length;
	return substring + (sliced ? "..." : "");
};
