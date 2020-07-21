import React from "react"
import renderer, {create, act} from 'react-test-renderer';
import NotFoundPage from "../../pages/404"
import * as Apollo from "@apollo/react-hooks";
import * as Gatsby from 'gatsby';

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

describe("404", () => {
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

    const page = {
        pathname: "/none/new-model"
    }

    let root;

    act(() => {
      root = create(
        <NotFoundPage location={page} />
      );
    })

    // проверка утверждений
    expect(root.toJSON()).toMatchSnapshot();

  })
})
