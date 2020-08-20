import React from 'react';

const TagInput = ({ TagElement, tags }) => {
  return (
    <div>
      {tags.map((tag, i) => (
        <TagElement key={i} value={tag} />
      ))}
    </div>
  );
};

export default TagInput;
