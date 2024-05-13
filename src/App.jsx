import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Editor from "./components/Editor";
import { IoIosAddCircle } from "react-icons/io";

const App = () => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("parseBody")) || []);
  const [active, setActive] = useState();

  useEffect(() => {
    if(data.length === 1){{
      setActive(data[0].id)
    }}

    localStorage.setItem("parseBody", JSON.stringify(data))
  }, [data])

  let addNote = () => {
    let note = {
      id: uuidv4(),
      title: "Enter Title",
      text: "#Enter Text Here",
    };
    setData([...data, note]);
  };

  const activeEle = (id) => {
    setActive(id);
    console.log(id);
  };

  const deleteNote = (id) => {
    let newNotes = data.filter((note) => note.id !== id);
    setData(newNotes);
  };

  const editNote = (id, inputVal) => {
    let newNotes = data.map((note) => {
      if (note.id === id) {
        note.title;
        note.text = inputVal;
      }
      return note;
    });
    setData(newNotes);
  }

  const editTitle = (id, inputVal) => {

    let newNotes = data.map((note) => {
      if (note.id === id) {
        note.title = inputVal;
        note.text;
      }
      return note;
    });
    setData(newNotes);
  };


  if(data.length === 0){
    return (
      <div className="text-center p-8 text-5xl item-center">
      <span>ADD NOTES</span>
      
      <button className="text-4xl p-6">
        <IoIosAddCircle onClick={addNote} />
      </button>
    </div>
    )
  }


  return (
    <div className="App">
      <Editor
        allData={data}
        handleData={addNote}
        handleDelete={deleteNote}
        activeEle={activeEle}
        handleEdit={editNote}
        handleTitle={editTitle}
        activeNoteId={active}
      />
    </div>
  );
};

export default App;
