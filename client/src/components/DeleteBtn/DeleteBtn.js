import "./SaveBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const DeleteBtn = props => (
  <span className="delete-btn btn btn-danger" {...props}>
    Delete
  </span>
);

export default DeleteBtn;
