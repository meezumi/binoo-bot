'use strict';

module.exports = {
  async findByLocation(ctx) {
    const { location } = ctx.params;
    const { filters = {} } = ctx.query;

    const entities = await strapi.db.query('api::business.business').findMany({
      where: {
        location: {
          slug: location
        },
        ...filters
      },
      populate: {
        images: true,
        categories: true,
        location: true,
        features: true
      }
    });

    return entities;
  },

  async search(ctx) {
    const { query } = ctx.query;

    const entities = await strapi.db.query('api::business.business').findMany({
      where: {
        $or: [
          { name: { $containsi: query } },
          { description: { $containsi: query } }
        ]
      },
      populate: {
        images: true,
        categories: true,
        location: true
      }
    });

    return entities;
  },

  async findByCategory(ctx) {
    const { category, location } = ctx.params;
    const { filters = {} } = ctx.query;

    const entities = await strapi.db.query('api::business.business').findMany({
      where: {
        categories: {
          slug: category
        },
        location: {
          slug: location
        },
        ...filters
      },
      populate: {
        images: true,
        categories: true,
        location: true,
        features: true
      }
    });

    return entities;
  }
};