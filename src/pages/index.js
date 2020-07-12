import React from "react"
// import { Link } from "gatsby"

import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag"

import Layout from "../components/layout"
import { Pagination } from 'antd';
import SEO from "../components/seo"
// import Image from "../components/image"


const APOLLO_QUERY = gql`
  query IndexQuery($limit: Int, $offset: Int) {
    car_model(limit: $limit, offset: $offset) {
      model_name
      slug
      model_description
      car_brand {
        brand_name
      }
    }
    car_model_aggregate {
      aggregate {
        count(columns: car_brand_id)
      }
    }
  }
`;

const IndexPage = () => {
  const limit = 2,
    defaultPage = 1,
    defaultPageSize = 2;

  const pageChange = num => {
    onLoadMore(num);
  };



  const {fetchMore, data, loading, error} = useQuery(
    APOLLO_QUERY,
    {
      variables: {
        offset: 0,
        limit: limit
      },
      fetchPolicy: "cache-and-network"
    }
  );

  console.log('!!!', {loading, error, data});

  const onLoadMore = (num) => {
    fetchMore({
      variables: {
        offset: (num - 1) * limit,
        limit: 2
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        return fetchMoreResult
      }
    });
  };

  return (
    <Layout>
      <SEO title="Home" />
      i'm
      {
        !loading && data && data.car_model.map(car => (
          <div key={car.slug}>
            {car.car_brand.brand_name}
            {car.model_name}
            {car.model_description}
          </div>
        ))
      }

      <Pagination
        defaultCurrent={defaultPage}
        defaultPageSize={defaultPageSize}
        total={!loading && data && data.car_model_aggregate.aggregate.count}
        onChange={pageChange}
      />
    </Layout>
  )
};

export default IndexPage
