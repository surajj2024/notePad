import PropTypes from "prop-types";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const EditorPage = ({ ele, handleDelete, activeEle, handleTitle }) => {
  const [edit, setEdit] = useState(true);
  const [editTitle, setEditTitle] = useState(ele.title);

  const { id, title } = ele;

  return (
    <div
      className="text-2xl flex justify-around cursor-pointer mt-4 items-center"
      onClick={() => activeEle(id)}
    >
      <div>
        {edit ? (
          <span className="w-[150px]">{editTitle}</span>
        ) : (
          <input
            className="w-[150px]"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        )}
      </div>
      <button onClick={() => handleDelete(id)}>
        <MdDelete />
      </button>

      <span
        onClick={() => {
          setEdit(!edit);

          if (editTitle !== title) {
            handleTitle(id, editTitle);
          }
        }}
      >
        {edit ? <MdEdit /> : <IoCheckmarkDoneOutline />}
      </span>
    </div>
  );
};

EditorPage.propTypes = {
  ele: PropTypes.object.isRequired,
  title: PropTypes.string,
  id: PropTypes.string,
  handleTitle: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  activeEle: PropTypes.func.isRequired,
};

export default EditorPage;
