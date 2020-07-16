import React from "react"

import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag"

import SiteLayout from "../components/SiteLayout"
import ItemShort from "../components/Item/ItemShort"
import { Pagination} from 'antd';
import SEO from "../components/seo"
import {graphql, useStaticQuery} from "gatsby";
// import Image from "../components/image"
import Img from "gatsby-image"


const APOLLO_QUERY = gql`
  query IndexQuery($limit: Int, $offset: Int) {
    car_model(limit: $limit, offset: $offset) {
      id
      model_name
      slug
      model_description
      car_brand {
        brand_name
        slug
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
  const limit = 4,
    defaultPage = 1;

  const pageChange = num => {
    onLoadMore(num);
  };

  const {fetchMore, data: apolloData, loading, error} = useQuery(
    APOLLO_QUERY,
    {
      variables: {
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
        limit: limit
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
    <SiteLayout>
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
};

export default IndexPage
