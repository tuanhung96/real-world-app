import { Link } from "react-router-dom";

function Pagination({ pageArr, currentPage, handleChangePage }) {
  return (
    <ul class="pagination">
      {pageArr.length > 1 ? (
        pageArr.map((page, index) => (
          <li
            class={currentPage === page ? "page-item active" : "page-item"}
            key={index}
          >
            <Link class="page-link" onClick={() => handleChangePage(page)}>
              {page}
            </Link>
          </li>
        ))
      ) : (
        <></>
      )}
    </ul>
  );
}

export default Pagination;
