import React, {useEffect, useState} from "react"
import {Pagination} from "antd";

import { graphql } from "gatsby"
import gql from "graphql-tag"

import {useQuery, useLazyQuery} from "@apollo/react-hooks";
import SiteLayout from "../components/SiteLayout.js"
import SEO from "../components/seo"
import ItemShort from "../components/Item/ItemShort";

export const query = graphql`
  query($car_brand_id: Int!) {
    hasura {
      car_model(where: {car_brand_id: {_eq: $car_brand_id}}) {
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
          max {
            updated_at
          }
          count(columns: car_brand_id)
        }
      }
    }
  }
`;

const APOLLO_QUERY_CAR_MODEL_LAST_UPDATE = gql`
  query APOLLO_QUERY_CAR_MODEL_LAST_UPDATE($car_brand_id: Int) {
    car_model_aggregate(where: {car_brand_id: {_eq: $car_brand_id}}) {
      aggregate {
        max {
          updated_at
        }
      }
    }
  }
`;

const APOLLO_QUERY_CAR_MODEL_UPDATER = gql`
  query APOLLO_QUERY_CAR_MODEL_UPDATER($car_brand_id: Int) {
      car_model(where: {car_brand_id: {_eq: $car_brand_id}}) {
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
          max {
            updated_at
          }
          count(columns: car_brand_id)
        }
      }
  }
`;

const PageCategory = ({ pageContext, data: graphqlData }) => {
  const [pageData, setPageData] = useState(graphqlData.hasura);
  const [paginationCurrent, setPaginationCurrent] = useState(1);
  let paginationSize = 2;
  let paginationTotal = pageData.car_model_aggregate.aggregate.count;

  const onPaginationCurrent = (num) => {
    setPaginationCurrent(num);
  };

  const {data: useQueryData, loading: useQueryLoading} = useQuery(
    APOLLO_QUERY_CAR_MODEL_LAST_UPDATE,
    {
      variables: {
        car_brand_id: pageContext.car_brand_id,
      },
      fetchPolicy: "cache-first"
    }
  );

  const [lazyQuery, { loading: useLazyQueryLoading, data: useLazyQueryData,  error: useLazyQueryError }] = useLazyQuery(APOLLO_QUERY_CAR_MODEL_UPDATER);

  useEffect(() => {
    if (!useLazyQueryError && !useQueryLoading && !useQueryLoading) {
      if (Date.parse(pageData.car_model_aggregate.aggregate.max.updated_at) < Date.parse(useQueryData.car_model_aggregate.aggregate.max.updated_at)) {

        if (!useLazyQueryLoading && !useLazyQueryData) {
          lazyQuery({
            variables: {
              car_brand_id: pageContext.car_brand_id,
            },
            fetchPolicy: "cache-first"
          })
        }

        if (!useLazyQueryLoading && useLazyQueryData) {
          setPageData(useLazyQueryData);
        }
      }
    }
  })

  return (
    <SiteLayout selectedMenuItem={pageData.car_model[0].car_brand.slug}>
      <SEO title="Home" />

      <Pagination
        current={paginationCurrent}
        defaultPageSize={paginationSize}
        total={paginationTotal}
        onChange={onPaginationCurrent}
      />

      {
        pageData.car_model.map((car, i) => {
          if ( !(i < (paginationCurrent * paginationSize - paginationSize)) && !(i >= (paginationCurrent * paginationSize)) ) {
            return <ItemShort car={car} key={i} />
          }
        })
      }
    </SiteLayout>
  )
};


export default PageCategory
