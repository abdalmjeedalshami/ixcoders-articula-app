import React from "react";

const MyTag = ({ tag, classes }) => {
  return (
    <div
      className={`article-tag d-inline-block px-2 ${classes}`}
      style={{
        backgroundColor: `${tag.background}`,
        color: `${tag.color}`,
      }}
    >
      {tag.text}
    </div>
  );
};

export default MyTag;
