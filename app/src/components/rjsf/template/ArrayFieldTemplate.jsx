import React from "react";

const ArrayFieldTemplate = (props) => {
  return (
    <div>
      {props.items.map((element) => (
        <div key={element.key}>
          {element.children}
          {element.hasRemove && (
            <button onClick={element.onDropIndexClick(element.index)}>
              Remove
            </button>
          )}
        </div>
      ))}
      {props.canAdd && <button onClick={props.onAddClick}>Add</button>}
    </div>
  );
};

export default ArrayFieldTemplate;
