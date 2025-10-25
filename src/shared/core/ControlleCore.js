import { success, errors } from "../constants/http.js";

export class ControlleCore {
	mount = (controller) => async (req, res) => {
		try {
			const { payload, message, ...pagination } = await controller(req);

			const response = ControlleCore.build({
				ownPayload: success[message ?? "ok"],
				payload,
				...pagination,
			});

			// Send response
			return res.status(response.code).send(response);
		} catch (error) {
			if (error.ownParams) {
				console[error.ownParams.level](JSON.stringify(error.ownParams));
			}

			const response = ControlleCore.build(error);

			res.status(response.code || 500).send(response);
		}
	};

	/**
	 * Constructs an HTTP response object.
	 */
	static build(response) {
		const ownPayload = response?.ownPayload ?? errors.server;

		return {
			code: ownPayload.code,
			data: response.payload || null,
			message: ownPayload.message,
		};
	}
}
