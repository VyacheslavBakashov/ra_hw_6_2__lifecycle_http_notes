import { FC, Key } from 'react';

import { TypesNote } from '../types';

type TypeProps = TypesNote & {
  onDelete: (id: Key) => () => Promise<void>;
};

export const Note: FC<TypeProps> = ({ id, content, onDelete }) => {
  return (
    <div className="note">
      <p className="note__content">{content}</p>
      <button className="note__delete" onClick={onDelete(id!)}>
        &#10006;
      </button>
    </div>
  );
};
