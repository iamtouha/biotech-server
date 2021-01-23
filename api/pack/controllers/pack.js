"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async delete(ctx) {
    try {
      const id = ctx.params.id;
      const p1 = strapi.query("invoice-item").find({ pack: id });
      const p2 = strapi.query("challan-item").find({ pack: id });
      const [items1, items2] = await Promise.all([p1, p2]);
      if (items1.length) {
        ctx.throw(400, "Pack is used in Invoice");
      } else if (items2.length) {
        ctx.throw(400, "Pack is used in Challan");
      } else {
        await strapi.query("pack").delete({ id });
      }
      ctx.send("deleted pack " + id);
    } catch (error) {
      ctx.throw(500, error.message);
    }
  },
};
