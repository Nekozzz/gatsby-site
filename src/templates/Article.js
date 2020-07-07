import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout.js"
import SEO from "../components/seo"

const ArticleTemplate = ({ data }) => (
    <Layout>
        <SEO title={data.hasura.articles[0].title} />
        <p>Заголовок: {data.hasura.articles[0].title}</p>
        <p>Тело: {data.hasura.articles[0].body}</p>
    </Layout>
);
export default ArticleTemplate
export const query = graphql`
  query($id: Int!) {
     hasura {
        articles(where: {id: {_eq: $id}}) {
            id
            title
            body
        }
    }
  }
`;