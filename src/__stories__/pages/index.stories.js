import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

import IndexPage from '../../pages/index';

export default {
  component: IndexPage,
  title: 'IndexPage',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  decorators: [withKnobs],
};

const pageData = {
  hasura: {
    "car_model": [
      {
        "id": 3,
        "slug": "bmw-x5-ii-30i",
        "model_name": "BMW X5 II 30i",
        "car_brand": {
          "brand_name": "BMW",
          "slug": "bmw"
        }
      },
      {
        "id": 1,
        "slug": "bmw-x1-e84",
        "model_name": "BMW X1 E84",
        "car_brand": {
          "brand_name": "BMW",
          "slug": "bmw"
        }
      },
      {
        "id": 33,
        "slug": "bmw-x1",
        "model_name": "BMW X1",
        "car_brand": {
          "brand_name": "BMW",
          "slug": "bmw"
        }
      },
      {
        "id": 34,
        "slug": "bmw-x11",
        "model_name": "BMW X11",
        "car_brand": {
          "brand_name": "BMW",
          "slug": "bmw"
        }
      },
      {
        "id": 35,
        "slug": "bmw-x00",
        "model_name": "BMW X00",
        "car_brand": {
          "brand_name": "BMW",
          "slug": "bmw"
        }
      },
      {
        "id": 36,
        "slug": "bmw-x02",
        "model_name": "BMW X02",
        "car_brand": {
          "brand_name": "BMW",
          "slug": "bmw"
        }
      },
      {
        "id": 37,
        "slug": "bmw-x05",
        "model_name": "BMW X05",
        "car_brand": {
          "brand_name": "BMW",
          "slug": "bmw"
        }
      }
    ],
    "car_model_aggregate": {
      "aggregate": {
        "max": {
          "updated_at": "2021-07-20T13:59:45.478585+00:00"
        },
        "count": 7
      }
    }
  }
}

const pageContext = {
  car_brand_id: 5
}

import { ApolloProvider } from '@apollo/react-hooks';
import { client } from '../../apollo/client';


export const Main = () => (
  <ApolloProvider client={client}>
    <IndexPage pageContext={pageContext} data={pageData} />
  </ApolloProvider>
);