import React from "react"
import {graphql, Link, useStaticQuery} from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
    const data = useStaticQuery(graphql`
    query MyQuery {
       hasura {
          articles {
            id
            slug
            title
          }
       }
    }
  `);

    return (
      <Layout>
        Статьи
        <div>
           {
             data.hasura.articles.map((article)=>{
                 return (
                     <div>
                         <a href={'/article/' + article.slug}>{article.title}</a>
                     </div>
                 )
             })
           }
        </div>

        <SEO title="Home" />
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div>
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
      </Layout>
    )
};

export default IndexPage
