"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate: async function (data) {
      const indexesObj = (await strapi.query("index").find())[0];
      const index = indexesObj.invoice;
      await strapi
        .query("index")
        .update({ id: indexesObj._id }, { invoice: index + 1 });
      data.index = index;
    },
    afterDelete: async (result) => {
      try {
        const promises = result.items.map((item) => {
          return strapi.query("invoice-item").delete({ id: item.id });
        });
        await Promise.all(promises);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
