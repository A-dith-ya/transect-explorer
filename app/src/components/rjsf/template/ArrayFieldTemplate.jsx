import React from "react";
const ArrayFieldTemplate = (props) => {
  const userEmail = sessionStorage.getItem("userEmail");
  return (
    <div className="group-form">
      <div className="group-form-wrap">
        <h1 className="group-form-title">Add Group Members</h1>
        <button
          disabled={!props.canAdd}
          onClick={props.onAddClick}
          style={{
            padding: "10px",
            borderRadius: "50px",
            backgroundColor: "#333",
            color: "white",
            fontSize: "18px",
            margin: "20px",
            border: "none",
          }}
        >
          <i style={{ color: "#2CEAA3" }} className="fa-solid fa-user-plus"></i>
        </button>
      </div>

      {props.items?.length ? (
        <div className="form-group-item" style={{}}>
          {props.items.map((element, index) => (
            <div key={element.key}>
              <div className="form-group-content-item">
                {element.children}
                {element.hasRemove && props.formData[index] !== userEmail && (
                  <button onClick={element.onDropIndexClick(element.index)}>
                    <i
                      style={{ color: "#E79C55" }}
                      className="fa-solid fa-user-slash"
                    ></i>
                    <h5 style={{ fontWeight: 600, color: "#E79C55" }}>User</h5>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ArrayFieldTemplate;
