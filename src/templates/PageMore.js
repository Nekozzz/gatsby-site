import React from "react"
import {graphql, Link} from "gatsby"
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
      <SEO title={car.model_name} />

      <div style={{
        'marginBottom': '8px'
      }}>
        <Link to={`/${car.car_brand.slug}`}>Каталог {car.car_brand.brand_name}</Link>
      </div>

      <hr  style={{
        'marginBottom': '14px'
      }}/>

      <ItemFull car={car} />

    </SiteLayout>
  )
};

export default PageMore