import { useEffect, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((datas) => {
        setTodos(datas);
      })
      .catch((err) => console.log(err));
  }, []);

  //! Derive paginated todos during render
  const endIndex = pageSize * currentPage;
  const startIndex = endIndex - pageSize;
  const paginatedTodos = todos.slice(startIndex, endIndex);

  const changePagination = (newPage) => {
    setCurrentPage(newPage);
  };

  const pageCount = Math.ceil(todos.length / pageSize);
  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

  //! Don't render until todos are loaded
  if (todos.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.userId}</td>
              <td>{todo.title}</td>
              <td>
                <p
                  className={
                    todo.completed ? "btn btn-success" : "btn btn-danger"
                  }
                >
                  {todo.completed ? "Completed" : "Pending"}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => changePagination(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>

          {pageNumbers.map((pageNumber) => (
            <li
              key={pageNumber}
              className={
                pageNumber === currentPage ? "page-item active" : "page-item"
              }
            >
              <button
                className="page-link"
                onClick={() => changePagination(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}

          <li className="page-item">
            <button
              className="page-link"
              onClick={() =>
                changePagination(Math.min(pageCount, currentPage + 1))
              }
              disabled={currentPage === pageCount}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
