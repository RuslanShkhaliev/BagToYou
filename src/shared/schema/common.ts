export const toNumber = (val: unknown) => {
	if (typeof val === 'string' && val.trim().length) {
		return Number(val);
	}
	return val;
};
