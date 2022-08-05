import React from "react";
import { Link } from "react-router-dom";

const QuotationsTable = ({ quotations }) => {
  return (
    <table className="table table-striped table-inverse table-responsive">
      <thead className="thead-inverse">
        <tr>
          <th>Name</th>
          <th>Ref. NO</th>
          <th>Last Date</th>
          <th>From</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {quotations.map((quotation) => (
          <tr key={quotation._id}>
            <td>{quotation.name}</td>
            <td>{quotation.refNo}</td>
            <td>{quotation.lastDate}</td>
            <td>{quotation.from}</td>
            <td>
              <Link to={`/quotation/add/product/${quotation._id}`}>
                Add Products
              </Link>
            </td>
            <td>
              <Link to={`/quotation/add/company/bid/${quotation._id}`}>
                Add Bids
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QuotationsTable;
