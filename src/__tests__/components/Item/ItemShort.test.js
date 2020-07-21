import React from "react"
import renderer from "react-test-renderer"
import ItemShort from "../../../components/Item/ItemShort";

describe("ItemShort", () => {
  test("renders correctly", () => {
    const tree = renderer
      .create(<ItemShort car={
        {
          car_brand: {
              brand_name: "Ford",
              slug: "ford"
          },
          id: 2,
          model_name: "Ford Focus III",
          slug: "ford-focus-iii",
        }
      }/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})