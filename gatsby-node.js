/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`);
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const PageContentTemplate = path.resolve("./src/templates/PageContent.js");
  const result = await graphql(`
    {
      hasura {
        car_brands {
          id
          slug
          brand_name
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
      component: PageContentTemplate,
      context: {
        id: carBrand.id,
      },
    })
  })

};
