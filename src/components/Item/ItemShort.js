import React from "react";
import { Link } from "gatsby"

const ItemShort = ({car}) => {

  return (
    <div key={car.slug}>
      <div>
        {car && (
          <img className={'img-preview'} src={`http://lorempixel.com/460/230/transport/${car.id}/`} alt=""/>
        )}
      </div>
      <div>
        Марка: {car.car_brand.brand_name}
      </div>
      <div>
        Модель: {car.model_name}
      </div>
      <Link to={`/${car.car_brand.slug}/${car.slug}`}>Узнать больше...</Link>
      <hr  style={{
        'marginTop': '8px',
        'marginBottom': '24px'
      }} />
    </div>
  )
};

export default ItemShort
