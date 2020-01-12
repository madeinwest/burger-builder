export const updateObject = (oldObject, updatedProporties) => {
	return {
		...oldObject,
		...updatedProporties
	}
}