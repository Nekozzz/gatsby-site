import React from "react"
import { useStaticQuery } from "gatsby"
import renderer from "react-test-renderer"
import SiteLayout from "../../components/SiteLayout";
import * as Gatsby from "gatsby";

beforeEach(() => {
  const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
  useStaticQuery.mockImplementationOnce(() => (
    {
      site: {
        siteMetadata: {
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
    }
  ))
})

describe("SiteLayout", () => {
  test("renders correctly", () => {

    // const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
    // useStaticQuery.mockImplementation(() => ({
    //   site: {
    //     siteMetadata:{
    //       title: 'asd'
    //     }
    //   },
    //   hasura: {
    //     car_brands: [
    //       {
    //         slug: 'adidas',
    //         brand_name: 'Adiads'
    //       },
    //       {
    //         slug: 'cat',
    //         brand_name: 'Cat man'
    //       },
    //     ]
    //   }
    // }));


    const tree = renderer
      .create(
        <SiteLayout>content</SiteLayout>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})