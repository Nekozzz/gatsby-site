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
        car_brand_id: carBrand.id,
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


/*
// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  console.log('onCreatePage', {page, actions});
  const { createPage } = actions
  // Only update the `/app` page.
  if (page.path.match(/^\/rou/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/rou/!*"
    // Update the page.
    createPage(page)
  }
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions
  // Check if the page is a localized 404
  if (page.path.match(/^\/[a-z]{2}\/lox\/$/)) {
    const oldPage = { ...page }
    // Get the language code from the path, and match all paths
    // starting with this code (apart from other valid paths)
    const langCode = page.path.split(`/`)[1]
    page.matchPath = `/${langCode}/!*`
    // Recreate the modified page
    deletePage(oldPage)
    createPage(page)
  }
}*/
