import React from "react";
import addIcon from "../../../assets/add-item-icon.png";

const ArrayFieldTemplate = (props) => { console.log(props);
  return (
    <div className="arrayfield">
        <div className="arrayfield__title">
            <h3>{props.title}</h3>
            {props.canAdd && <img className="arrayfield__add-button" onClick={props.onAddClick}>{addIcon}</img>}
        </div>
      {props.items.map((element) => (
        <div className="arrayfield__item" key={element.key}>
          {element.children}
          {element.hasRemove && (
            <button className="arrayfield__remove-button" onClick={element.onDropIndexClick(element.index)}>
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ArrayFieldTemplate;