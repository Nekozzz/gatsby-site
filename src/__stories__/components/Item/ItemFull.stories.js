import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

import ItemFull from '../../../components/Item/ItemFull';

export default {
  component: ItemFull,
  title: 'ItemFull',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  decorators: [withKnobs],
};

export const Main = () => (
  <ItemFull car={
    {
      car_brand: {
        brand_name: text("brand_name", "Ford"),
        slug: "ford"
      },
      id: 2,
      model_name: text("model_name", "Ford Focus III"),
      model_description: text("model_description", "В сравнении со своим предшественником, Focus-III увеличился в длину на 21 мм"),
      slug: "ford-focus-iii",
    }
  } />
);