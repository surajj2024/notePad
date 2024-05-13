import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FaHeading,
  FaItalic,
  FaBold,
  FaStrikethrough,
  FaLink,
  FaQuoteRight,
  FaCode,
  FaImage,
  FaListUl,
  FaListOl,
  FaListCheck,
} from "react-icons/fa6";
import PreviewPage from "./PreviewPage";
import { IoIosAddCircle } from "react-icons/io";
import EditorPage from "./EditorPage";

const Editor = ({
  allData,
  handleData,
  handleDelete,
  handleEdit,
  activeEle,
  activeNoteId,
  handleTitle,
}) => {
  const [activeBtn, setActiveBtn] = useState(true);
  const [input, setInput] = useState("");
  const [currArr, setCurrArr] = useState([]);

  useEffect(() => {
    let data = allData.filter((ele) => {
      return ele.id === activeNoteId;
    });

    setCurrArr(data);
  }, [activeNoteId]);

  useEffect(() => {
    setInput(currArr[0]?.text);
  }, [currArr]);

  return (
    <div className="flex ">
      <div className="w-1/5 p-4  bg-slate-100 min-h-[100vh]">
        <div className="text-3xl p-4 flex justify-center gap-5 border-b-4 border-indigo-500">
        <span>
          NOTES
          </span>
          <button>
            <IoIosAddCircle onClick={handleData} />
          </button>
        </div>
        {allData.map((ele) => {
          return (
            <EditorPage
              key={ele.id}
              ele={ele}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              activeEle={activeEle}
              handleTitle={handleTitle}
            />
          );
        })}
      </div>

      <div className="w-4/5 min-h-[100vh] p-10">
        <div className="flex gap-6 pb-4">
          <button className="w-[100px]"
            style={{ border: activeBtn ? "1px solid black" : "none" }}
            onClick={() => setActiveBtn(true)}
          >
            Write
          </button>
          <button
          className="w-[100px]"
            style={{ border: activeBtn ? "none" : "1px solid black" }}
            onClick={() => setActiveBtn(false)}
          >
            Preview
          </button>

          {activeBtn ? (
            <div className="flex gap-6">
              <button onClick={() => setInput((prev) => prev + " ### ")}>
                <FaHeading />
              </button>
              <button onClick={() => setInput((prev) => prev + " ** **")}>
                <FaBold />
              </button>
              <button onClick={() => setInput((prev) => prev + "* *")}>
                <FaItalic />
              </button>
              <button onClick={() => setInput((prev) => prev + "~~ ~~")}>
                <FaStrikethrough />
              </button>

              <button onClick={() => setInput((prev) => `${prev} [](url)`)}>
                <FaLink />
              </button>
              <button onClick={() => setInput((prev) => prev + " > ")}>
                <FaQuoteRight />
              </button>
              <button onClick={() => setInput((prev) => prev + ``)}>
                <FaCode />
              </button>
              <button
                onClick={() =>
                  setInput(
                    (prev) => prev + " ![](https://example.com/your-image.png) "
                  )
                }
              >
                <FaImage />
              </button>

              <button onClick={() => setInput((prev) => prev + "\n - ")}>
                <FaListUl />
              </button>
              <button onClick={() => setInput((prev) => prev + "\n 1. ")}>
                <FaListOl />
              </button>
              <button onClick={() => setInput((prev) => prev + "\n - [ ]")}>
                <FaListCheck />
              </button>
            </div>
          ) : (
            <span>Your Markup Notes are ...</span>
          )}
        </div>

        <div className="border-t-4 border-indigo-500 ">
          {activeBtn ? (
            <textarea
              className="w-full h-[88vh] border-2 border-indigo-500"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                handleEdit(currArr[0]?.id, input);
              }}
            ></textarea>
          ) : (
            <PreviewPage text={input} />
          )}
        </div>
      </div>
    </div>
  );
};

Editor.propTypes = {
  allData: PropTypes.array.isRequired,
  handleData: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  activeEle: PropTypes.func,
  activeNoteId: PropTypes.string,
  handleTitle: PropTypes.func,
};

export default Editor;
