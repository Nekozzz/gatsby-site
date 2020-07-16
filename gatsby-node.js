/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`);
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const templatePageCategory = path.resolve("./src/templates/PageCategory.js");
  const templatePageMore = path.resolve("./src/templates/PageMore.js");

  const result = await graphql(`
    {
      hasura {
        car_brands {
          id
          slug
        }
        car_model {
          slug
          model_name
          model_description
          id
          car_brand_id
          car_brand {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return
  }

  const carBrands = result.data.hasura.car_brands;
  carBrands.forEach(carBrand => {
    createPage({
      path: `${carBrand.slug}`,
      component: templatePageCategory,
      context: {
        id: carBrand.id,
      },
    })
  });

  const carModels = result.data.hasura.car_model;
  carModels.forEach(carModel => {
    createPage({
      path: `${carModel.car_brand.slug}/${carModel.slug}`,
      component: templatePageMore,
      context: {
        car_id: carModel.id
      },
    })
  });

};
