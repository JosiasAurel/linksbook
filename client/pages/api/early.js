
import { Deta } from "deta";

const deta = Deta(`a0ojq87u_xgq3dQQLkXj3YBsJ5iJKZ5MTAtYmCLoF`);

const db = deta.Base("earlyBirds");

module.exports = async (req, res) => {
    const date = new Date().toString();
    const { email } = req.body;
    await db.put({email, date});
    res.json({msg: "Done", email});
}