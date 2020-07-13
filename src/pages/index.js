import React from "react"
// import { Link } from "gatsby"

import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag"

import SiteLayout from "../components/SiteLayout"
import {Menu, Pagination} from 'antd';
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

let totalPages;

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
      fetchPolicy: "cache-first"
    }
  );

  totalPages = !loading && data ? data.car_model_aggregate.aggregate.count : totalPages || null


  console.log('!!!', {loading, error, data});

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
    <SiteLayout sidebarItem={
      <Menu.Item key="1">
        Главная страница
      </Menu.Item>
    }>
      <SEO title="Home" />
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
        !loading && data && data.car_model.map(car => (
            <div key={car.slug}>
              {car.car_brand.brand_name}
              <br/>
              {car.model_name}
              <br/>
              {car.model_description}
              <hr />
            </div>
          )
        )
      }

    </SiteLayout>
  )
};

export default IndexPage
