import React, {useEffect, useState} from "react"
import {Pagination} from "antd";

import { graphql } from "gatsby"
import gql from "graphql-tag"

import {useQuery, useLazyQuery} from "@apollo/react-hooks";
import SiteLayout from "../components/SiteLayout.js"
import SEO from "../components/seo"
import ItemShort from "../components/Item/ItemShort";

export const query = graphql`
  query {
    hasura {
      car_model {
        id
        slug
        model_name
        model_description
        car_brand {
          brand_name
          slug
        }
      }
      car_model_aggregate {
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
  query APOLLO_QUERY_CAR_MODEL_LAST_UPDATE {
    car_model_aggregate {
      aggregate {
        max {
          updated_at
        }
      }
    }
  }
`;

const APOLLO_QUERY_CAR_MODEL_UPDATER = gql`
  query APOLLO_QUERY_CAR_MODEL_UPDATER {
      car_model {
        id
        slug
        model_name
        model_description
        car_brand {
          brand_name
          slug
        }
      }
      car_model_aggregate {
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
  let paginationSize = 4;
  let paginationTotal = pageData.car_model_aggregate.aggregate.count;

  const onPaginationCurrent = (num) => {
    setPaginationCurrent(num);
  };

  const {data: useQueryData, loading: useQueryLoading,  error: useQueryError } = useQuery(
    APOLLO_QUERY_CAR_MODEL_LAST_UPDATE,
    {
      variables: {
        car_brand_id: pageContext.car_brand_id,
      },
      fetchPolicy: "cache-first"
    }
  );

  const [lazyQuery, { data: useLazyQueryData, loading: useLazyQueryLoading,  error: useLazyQueryError }] = useLazyQuery(APOLLO_QUERY_CAR_MODEL_UPDATER);
  //console.log('force', {useLazyQueryLoading, useLazyQueryData, useLazyQueryError})

  useEffect(() => {
    if (useQueryError || useLazyQueryError) {
      console.error('useQueryError:', {useQueryError, useLazyQueryError});
    }
    else if (useQueryData && +new Date(pageData.car_model_aggregate.aggregate.max.updated_at) < +new Date(useQueryData.car_model_aggregate.aggregate.max.updated_at)) {
      if (!useLazyQueryData) {
        lazyQuery({
          variables: {
            car_brand_id: pageContext.car_brand_id,
          },
          fetchPolicy: "cache-first"
        })
      } else {
        setPageData(useLazyQueryData);
      }
    }
  }, [useQueryLoading, useLazyQueryLoading, useLazyQueryData])

  return (
    <SiteLayout>
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
