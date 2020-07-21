import React, {useEffect, useState} from "react"
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

const PageDefaultComponent = (show = false) => (
  <SiteLayout>
    {show &&
      <>
        <SEO title="404: Not found" />
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </>
    }
  </SiteLayout>
)

const PageMoreComponent = (carData) => (
  <>
    <TemplatePageMore data={carData} />
  </>
)

const NotFoundPage = (page) => {
  const carBrandsData = useStaticQuery(graphql`
    query asd {
      hasura {
        car_brands {
          slug
        }
      }
    }
  `);

  const [lazyQuery, {data: useLazyQueryData, loading: useLazyQueryLoading, error: useLazyQueryError}] = useLazyQuery(APOLLO_QUERY_CAR_MODEL);
  const pathNames = page.location.pathname.match(/[a-z-_0-9]+/g);

  const [pageComponent, setPageComponent] = useState(PageDefaultComponent())

  useEffect(() => {
    if (pathNames.length > 1 && carBrandsData.hasura.car_brands.filter((brand)=>{return brand.slug === pathNames[0]}).length) {
      if (useLazyQueryError) {
        console.error('useQueryError:', {useLazyQueryError});
        setPageComponent(PageDefaultComponent(true));
      } else {
        if (!useLazyQueryData && !useLazyQueryData) {
          lazyQuery({
            variables: {
              car_model_slug: pathNames[1]
            },
            fetchPolicy: "cache-first"
          })
        } else {
          console.log('useLazyQueryD!!!ata', useLazyQueryData);
          if (useLazyQueryData.car_model.length) {
            setPageComponent(PageMoreComponent({hasura: useLazyQueryData}))
          } else {
            setPageComponent(PageDefaultComponent(true));
          }
        }
      }
    } else {
      setPageComponent(PageDefaultComponent(true));
    }
  }, [useLazyQueryLoading, useLazyQueryData])

  return pageComponent
};

export default NotFoundPage