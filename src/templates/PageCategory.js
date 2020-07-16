import React from "react"
import { graphql } from "gatsby"
import SiteLayout from "../components/SiteLayout.js"
import SEO from "../components/seo"
import {Pagination} from "antd";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag"
import ItemShort from "../components/Item/ItemShort";

export const query = graphql`
  query($id: Int!) {
    hasura {
      car_brands(where: {id: {_eq: $id}}) {
        slug
      }
    }
  }
`;

const APOLLO_QUERY = gql`
  query IndexQuery($limit: Int, $offset: Int, $car_brand_id: Int) {
    car_model(where: {car_brand_id: {_eq: $car_brand_id}}, limit: $limit, offset: $offset) {
      id
      slug
      model_name
      model_description
      car_brand {
        brand_name
        slug
      }
    }
    car_model_aggregate(where: {car_brand_id: {_eq: $car_brand_id}}) {
      aggregate {
        count(columns: car_brand_id)
      }
    }
  }
`;

let totalPages;

const PageCategory = ({ pageContext, data }) => {
  const limit = 2,
    defaultPage = 1;

  const pageChange = num => {
    onLoadMore(num);
  };

  const {fetchMore, data: apolloData, loading, error} = useQuery(
    APOLLO_QUERY,
    {
      variables: {
        car_brand_id: pageContext.id,
        offset: 0,
        limit: limit
      },
      fetchPolicy: "cache-first"
    }
  );

  totalPages = !loading && apolloData ? apolloData.car_model_aggregate.aggregate.count : totalPages || null;

  console.log('!!!', {loading, error, apolloData});

  const onLoadMore = (num) => {
    fetchMore({
      variables: {
        offset: (num - 1) * limit,
        limit: 2
      },
      fetchPolicy: "cache-first",
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        return fetchMoreResult
      }
    });
  };

  return (
    <SiteLayout selectedMenuItem={data.hasura.car_brands[0].slug}>
      <SEO title="Home" />
      {
        totalPages &&
        <Pagination
          defaultCurrent={defaultPage}
          defaultPageSize={limit}
          total={totalPages}
          onChange={pageChange}
        />
      }

      {
        !loading && apolloData && apolloData.car_model.map((car, i) => (
            <ItemShort car={car} key={i} />
          )
        )
      }

    </SiteLayout>
  )

  //   < SiteLayout >
  //   < SEO
  // title = {data.hasura.car_model[0].model_name}
  // />
  // <Content className="site-layout-background">
  //   {
  //     totalPages &&
  //     <Pagination
  //       defaultCurrent={defaultPage}
  //       defaultPageSize={defaultPageSize}
  //       total={totalPages}
  //       onChange={pageChange}
  //     />
  //   }
  //   {
  //     data.hasura.car_model.map(car_model => (
  //       <div key={car_model.slug}>
  //         {car_model.model_name}
  //         <br/>
  //         {car_model.model_description}
  //         <hr/>
  //       </div>
  //     ))
  //   }
  // </Content>
  // < /SiteLayout>
};


export default PageCategory
