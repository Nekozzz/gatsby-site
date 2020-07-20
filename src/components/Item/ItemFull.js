import React from "react";
import { Link } from "gatsby";

const ItemFull = ({car}) => {
  return (
    <div key={car.slug}>
      <div style={{
        'marginBottom': '8px'
      }}>
        <Link to={`/${car.car_brand.slug}`}>Каталог {car.car_brand.brand_name}</Link>
      </div>

      <hr  style={{
        'marginBottom': '14px'
      }}/>

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
      <div style={{
        'marginTop': '8px'
      }}>
        Описание:
        <div>
          {car.model_description}
        </div>
      </div>
    </div>
  )
};

export default ItemFull
