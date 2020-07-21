import React from "react"
import renderer, {create, act} from 'react-test-renderer';
import PageCategory from "../../pages/index"
import * as Apollo from "@apollo/react-hooks";
import * as Gatsby from 'gatsby';
import NotFoundPage from "../../pages/404";

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("IndexPage", () => {
  test("renders correctly", () => {

    jest.spyOn(Apollo, 'useQuery').mockImplementation(() => ({
      car_model_aggregate: {
        aggregate: {
          max: {
            updated_at: "2021-07-20T13:59:45.478585+00:00"
          }
        }
      }
    }));

    jest.spyOn(Gatsby, 'useStaticQuery').mockImplementation(() => ({
      site: {
        siteMetadata:{
          title: 'asd'
        }
      },
      hasura: {
        car_brands: [
          {
            slug: 'adidas',
            brand_name: 'Adiads'
          },
          {
            slug: 'cat',
            brand_name: 'Cat man'
          },
        ]
      }
    }));

    const pageContext = {
      car_brand_id: 5
    }

    const graphqlData = {
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

    let root;

    act(() => {
      root = create(
        <PageCategory
          pageContext={pageContext}
          data={graphqlData}
        />
      );
    });

    // проверка утверждений
    expect(root.toJSON()).toMatchSnapshot();

  })
})
