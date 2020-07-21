import React from "react"
import renderer from "react-test-renderer"
import ItemFull from "../../../components/Item/ItemFull"

describe("ItemFull", () => {
  test("renders correctly", () => {
    const tree = renderer
      .create(<ItemFull car={
        {
          car_brand: {
              brand_name: "Ford",
              slug: "ford"
          },
          id: 2,
          model_name: "Ford Focus III",
          model_description: "В сравнении со своим предшественником, Focus-III увеличился в длину на 21 мм",
          slug: "ford-focus-iii",
        }
      }/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})