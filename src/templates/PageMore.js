import React from "react"
import {graphql} from "gatsby"
import SiteLayout from "../components/SiteLayout.js"
import ItemFull from "../components/Item/ItemFull";
import SEO from "../components/seo"

export const query = graphql`
  query($car_id: Int!) {
    hasura {
      car_model(where: {id: {_eq: $car_id}}) {
        id
        slug
        model_name
        model_description
        id
        car_brand {
          brand_name
          slug
        }
      }
    }
  }
`;

const PageMore = ({ data }) => {
  const car = data.hasura.car_model[0];

  return (
    <SiteLayout selectedMenuItem={car.car_brand.slug}>
      <SEO title={`Подробно - ${car.model_name}`} />

      <ItemFull car={car} />

    </SiteLayout>
  )
};

export default PageMore