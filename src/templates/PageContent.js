import React from "react"
import { graphql } from "gatsby"
import SiteLayout from "../components/SiteLayout.js"
import SEO from "../components/seo"
import {Layout, Pagination} from "antd";
const { Content } = Layout;

export const query = graphql`
  query($id: Int!) {
    hasura {
      car_model(where: {car_brand: {id: {_eq: $id}} }) {
        slug
        model_name
        model_description
      }
    }
  }
`;

const PageContent = ({ data }) => (
    <SiteLayout>
      <SEO title={data.hasura.car_model[0].model_name} />
      <Content className="site-layout-background">
        {
          totalPages &&
          <Pagination
            defaultCurrent={defaultPage}
            defaultPageSize={defaultPageSize}
            total={totalPages}
            onChange={pageChange}
          />
        }
        {
          data.hasura.car_model.map(car_model => (
            <div key={car_model.slug}>
              {car_model.model_name}
              <br/>
              {car_model.model_description}
              <hr />
            </div>
          ))
        }
      </Content>

    </SiteLayout>
);


export default PageContent
