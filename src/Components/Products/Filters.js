import React from "react";
import Collapsible from 'react-collapsible';
import "./filter.css";

export const Filters = (props) => {
  const filterObj = props.filterObj;
  const keys = Object.keys(filterObj);

  //console.log("keys", keys)

  return (
    <form>
      <p className="blockContainter d_flex">
      <label>Show all Gategory</label>
      <input id="all" type="checkbox" name="all" onClick={props.allGategory} />
      </p>
      <div className="filterGroup">
        {keys.map((item, i) => {
          return (            
            <section key={i}>
              <Collapsible trigger={item}>
              {filterObj[item].map(({ title }, idx) => {
                return (
                    <p key={idx} className="d_flex">
                    <label>{title}</label>
                    <input
                      type="checkbox"
                      name={title}
                      onClick={props.changeHandler}
                    />
                  </p>
                );
              })}
        </Collapsible>
            </section>
          );
        })}
      </div>
    </form>
  );
};
