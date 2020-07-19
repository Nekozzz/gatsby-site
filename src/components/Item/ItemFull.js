import React from "react";

const ItemFull = ({car}) => {

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
