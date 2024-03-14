import React from "react";
import addIcon from "../../../assets/add-item-icon.png";

const ArrayFieldTemplate = (props) => {

  const transformItemTitle = (arrayTitle, title) => {
    // Remove the "s" at the end of the arrayTitle if it exists
    arrayTitle = arrayTitle.endsWith("s") ? arrayTitle.slice(0, -1) : arrayTitle;
    // Split the title by '-'
    const parts = title.split('-');
    // Convert the second part to an integer
    const index = parseInt(parts[1]);
    // Return the transformed title
    return `${arrayTitle} ${index}`;
  };

  const updatedProps = {
    ...props,
    items: props.items.map((element, index) => {
      return {
        ...element,
        children: [
          React.cloneElement(element.children, {key: index,  title: transformItemTitle(props.title, element.children.props.title) })
        ]
      };
    })
  };


  return (
    <div className="arrayfield">
      <div className="arrayfield__title">
        <h3>{props.title}</h3>
        {props.canAdd && (
          <button className="arrayfield__add-button" onClick={props.onAddClick}>
            Add
          </button>
        )}
      </div>
      {props.items.map((element) => (
        <div className="arrayfield__item" key={element.key}>
          {console.log(updatedProps)}
          {element.children}
          {element.hasRemove && (
            <button
              className="arrayfield__remove-button"
              onClick={element.onDropIndexClick(element.index)}
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ArrayFieldTemplate;
