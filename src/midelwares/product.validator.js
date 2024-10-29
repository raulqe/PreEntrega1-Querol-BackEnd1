export const productValidator = (req, res, next) => {
	const bodyName = req.body.name
	if (bodyName === undefined || typeof bodyName !== "string")
		
		res
			.status(400)
			.json({ message: "Invalid body: name is required" });
	return next();
}