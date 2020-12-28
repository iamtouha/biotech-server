"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate: async function (data) {
      const indexesObj = (await strapi.query("index").find())[0];
      const index = indexesObj.challan;
      await strapi
        .query("index")
        .update({ id: indexesObj._id }, { challan: index + 1 });
      data.index = index;
    },
  },
};
