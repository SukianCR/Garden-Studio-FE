  export default function  Loading_Bar(valueNow) {
    return (
      <div className="row w100 top2">
        <div className="col-12 ">
          {" "}
          Loading ...
          <div className="progress bg-primary">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-success "
              role="progressbar"
              aria-valuenow={valueNow || "25"}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    );
  }