"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate: async function (data) {
      const indexesObj = (await strapi.query("index").find())[0];
      const index = indexesObj.dealer;
      await strapi
        .query("index")
        .update({ id: indexesObj._id }, { dealer: index + 1 });
      data.index = index + 1;
    },
  },
};
