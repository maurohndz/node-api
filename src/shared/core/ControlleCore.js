/**
 * Template base for construction controllers
 */
export class ControlleCore {
  mount = (controller) => async (req, res) => {
    try {
        const data = await controller(req);

        // Send response
        return res.status(200).send(data);
    } catch (error) {
        res.status(500).send({});
    }
  };
}