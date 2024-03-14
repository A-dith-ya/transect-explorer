import React from "react";

const ObjectFieldTemplate = (props) => {
  return (
    <div>
      <div>
        <div className="title"> {props.title} </div>
      </div>
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
