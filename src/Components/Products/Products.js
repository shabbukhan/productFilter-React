import React, { useState, useEffect } from "react";
import { Filters } from "./Filters";
import allProducts from "../../Json/products.json";
import "./products.css";

export const Products = (index) => {
  const filterMod = {
    "Women Suits": [
      {
        title: "Maxi",
        check: false,
      },
      {
        title: "Georgette Suit",
        check: false,
      },
    ],
    "Men Suits": [
      {
        title: "T-shirts",
        check: false,
      },
      {
        title: "Shirts",
        check: false,
      },
    ],
    Kids: [
      {
        title: "Three Piece",
        check: false,
      },
      {
        title: "Half-Pant",
        check: false,
      },
    ],
  };

  const products = allProducts.product;

  const [filters, setFilters] = useState([]);
  // setFilters not using as of now, we can display products on 1st load based on allgategory checkbox
  const [filteredproduct, setFilteredproduct] = useState([]);
  const [showall, setShowall] = useState(false);

  const changeHandler = (e) => {
    for (let key in filterMod) {
      filterMod[key].filter((item, idx) => {

          if (item.title === e.target.name && e.target.checked) {
            setFilters([...filters, { title: item.title }]);            

            products.filter(i => {
              if (i.filtername === e.target.name) {
                setFilteredproduct((filteredproduct) => [...filteredproduct, i]);
                // filteredproduct is previous state
              }
            })
          }

          if (!e.target.checked) {
            setFilters(
              filters.filter(
                ({title}) => title !== e.target.name
              )
            );

            setFilteredproduct(
              filteredproduct.filter(
                ({filtername}) => filtername !== e.target.name
              )
            );
          }
      });
    }
  };

  console.log("filters", filters);
  console.log("filteredproduct", filteredproduct);

  const allGategory = (e) => {
    e.target.checked ? setShowall(true) : setShowall(false);
  }; 

  return (
    <div className="gridContainer">
      <aside>
        <Filters
          filterObj={filterMod}
          changeHandler={changeHandler}
          allGategory={allGategory}
        />
      </aside>

      <section>
        <h2 className="text_center">Our Products</h2>
        <ul className="products">
          {filters.length === 0 || showall ? (
            products.map(({ title, src }, idx) => {
              return (
                <li key={idx}>
                  <img src={src} />
                  <p>{title}</p>
                </li>
              );
            })
          ) : filteredproduct.length === 0 ? (
            <li> Oops! No Product Found. </li>
          ) : (
            filteredproduct.map(({ title, src }, idx) => {
              return (
                <li key={idx}>
                  <img src={src} />
                  <p>{title}</p>
                </li>
              );
            })
          )}
        </ul>
      </section>
    </div>
  );
};
