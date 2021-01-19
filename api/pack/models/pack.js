"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeDelete(params) {
      const p1 = strapi.query("invoice-item").find({ pack: params._id });
      const p2 = strapi.query("challan-item").find({ pack: params._id });
      const [items1, items2] = await Promise.all([p1, p2]);
      if (items1.length) {
        throw new Error("Pack used in Invoice " + items1[0].invoice.index);
      } else if (items2.length) {
        throw new Error("Pack used in Challan " + items2[0].challan.index);
      }
    },
  },
};
