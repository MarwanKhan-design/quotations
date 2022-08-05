import React from "react";

const CompanyTable = ({ companies }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {companies &&
          companies.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.address}</td>
              <td>{c.phone}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default CompanyTable;
