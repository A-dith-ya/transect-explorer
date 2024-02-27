import React from "react";

const ObjectFieldTemplate = (props) => {
  return (
    <div>
      {props.title}
      {props.description}
      {props.properties.map((element, index) => (
        <div key={index} className="login-form">
          {element.content}
        </div>
      ))}
    </div>
  );
};

export default ObjectFieldTemplate;
