/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
// You can delete this file if you're not using it
const path = require(`path`);
exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;
    const ArticleTemplate = path.resolve("./src/templates/Article.js");
    const result = await graphql(`
    {
       hasura {
          articles {
            body
            id
            slug
            title
          }
       }
    }
  `);

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return
    }

    const Article = result.data.hasura.articles;
    Article.forEach(article => {
        createPage({
            path: `/article/${article.slug}`,
            component: ArticleTemplate,
            context: {
                id: article.id,
            },
        })
    })

}