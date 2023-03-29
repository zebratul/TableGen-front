import { Table, Spinner, Alert } from "react-bootstrap";
import "./TableData.css";

function TableData({ data, isLoading, error }) {

    if (error) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

  return (
      <Table striped bordered hover className="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>id</th>
            <th>Full Name</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.index}>
              <td>{item.index}</td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                {item.address.streetAddress}, {item.address.city},{" "}
                {item.address.state} {item.address.zipCode},{" "}
                {item.address.country}
              </td>
              <td>{item.phone}</td>
            </tr>
          ))}
          {isLoading && (
            <tr>
              <td colSpan={5} className="text-center">
                <Spinner animation="border" />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
  );
}

export default TableData;
