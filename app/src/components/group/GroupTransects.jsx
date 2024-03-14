const GroupTransects = (props) => {
  return (
    <div className="group-button group-transects">
      <div className="btn-flex">
        <h1>Group Transects</h1>
        <button className="add-btn" onClick={props.onAddClick}>
          {/* <Icon icon="mdi:bell" /> */}
        </button>
      </div>
      <div className="form-border">
        <button className="link-btn">MountDoom</button>
        <button className="link-btn">Frosty Forest</button>
        <button className="link-btn">Merry Meadow</button>
      </div>
    </div>
  );
};

export default GroupTransects;
