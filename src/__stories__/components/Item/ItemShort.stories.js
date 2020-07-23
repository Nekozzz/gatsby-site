import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

import ItemShort from '../../../components/Item/ItemShort';

export default {
  component: ItemShort,
  title: 'ItemShort',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  decorators: [withKnobs],
};

export const Main = () => (
  <ItemShort car={
    {
      car_brand: {
        brand_name: text("brand_name", "Ford"),
        slug: "ford"
      },
      id: 2,
      model_name: text("model_name", "Ford Focus III"),
      slug: "ford-focus-iii",
    }
  } />
);