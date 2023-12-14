import React, { useEffect, useReducer } from "react";
import { getTags } from "../../apis/tags";
import { Link } from "react-router-dom";

const initialState = {
  isLoadingTags: true,
  tags: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "update":
      return {
        ...state,
        isLoadingTags: action.payload.isLoadingTags,
        tags: action.payload.tags,
      };
    default:
      throw new Error("Invalid Action");
  }
}

function Tags({ handleChangeTag }) {
  const [{ isLoadingTags, tags }, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    getTags().then((data) => {
      dispatch({
        type: "update",
        payload: { isLoadingTags: false, tags: data },
      });
    });
  }, []);

  return (
    <div class="col-md-3">
      <div class="sidebar">
        <p>Popular Tags</p>

        {isLoadingTags ? <div>Loangding tags...</div> : <></>}

        <div class="tag-list">
          {tags.map((tag, index) => (
            <Link
              class="tag-pill tag-default"
              key={index}
              onClick={() => handleChangeTag(tag)}
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Tags);
