import "./spiner.styles.scss";
export const Spinner = () => {
  return (
    <div className="spinner">
      {/* <h2 className="loading">Loading...</h2> */}
      <div className="spinner-sector spiner-sector-red"></div>
      <div className="spinner-sector spiner-sector-blue"></div>
      <div className="spinner-sector spiner-sector-green"></div>
    </div>
  );
};
