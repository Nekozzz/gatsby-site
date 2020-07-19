import React from "react"
import {graphql, useStaticQuery} from "gatsby";
import gql from "graphql-tag"
import {useQuery, useLazyQuery} from "@apollo/react-hooks";

import SiteLayout from "../components/SiteLayout"
import SEO from "../components/seo"
import TemplatePageMore from "../templates/PageMore";

const APOLLO_QUERY_CAR_MODEL = gql`
  query APOLLO_QUERY_CAR_MODEL($car_model_slug: String) {
    car_model(where: {slug: {_eq: $car_model_slug}}) {
      id
      slug
      model_name
      model_description
      car_brand {
        brand_name
        slug
      }
    }
  }
`;

const NotFoundPage = (page) => {
  const carBrands = useStaticQuery(graphql`
    query asd {
      hasura {
        car_brands {
          slug
        }
      }
    }
  `);

  const [forceUpdate, { loading: useLazyQueryLoading, data: useLazyQueryData }] = useLazyQuery(APOLLO_QUERY_CAR_MODEL);

  console.log('404', page, carBrands);
  const pathNames = page.location.pathname.match(/[a-z-_0-9]+/g);

  if (pathNames.length > 1 && carBrands) {
    if ( carBrands.hasura.car_brands.filter((brand)=>{return brand.slug === pathNames[0]}).length ) {

      if (!useLazyQueryLoading && !useLazyQueryData) {
        forceUpdate({
          variables: {
            car_model_slug: pathNames[1]
          },
          fetchPolicy: "cache-first"
        })
      }

      if (!useLazyQueryLoading && useLazyQueryData) {
        if (useLazyQueryData.car_model.length) {
          return (
            <TemplatePageMore data={{hasura: useLazyQueryData}} />
          )
        }
      }
    }
  }

  return (
    <SiteLayout>
      <SEO title="404: Not found" />
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </SiteLayout>
  );
};

export default NotFoundPage
