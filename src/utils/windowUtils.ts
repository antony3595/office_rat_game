const copyStringToClipboard = (str: string): Promise<void> => {
	if (navigator && navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(str);
	return Promise.reject("Не удалось скопировать текст");
};
export default copyStringToClipboard;
