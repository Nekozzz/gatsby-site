import React from "react"
import renderer from "react-test-renderer"
import PageMore from "../../templates/PageMore"
import * as Gatsby from 'gatsby';

describe("PageMore", () => {
  test("renders correctly", () => {

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
        ]
      }
    }

    const tree = renderer
      .create(
        <PageMore
          data={graphqlData}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
