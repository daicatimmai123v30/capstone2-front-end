import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ContainerLeft from "../Container/ContainerLeft";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Documents.css";

export default function Documents() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    console.log(editorState);
  }, [editorState]);
  return (
    <div className="main">
      <Header />
      <div className="body">
        <div className="body-container">
          <ContainerLeft />
          <div className="container-right container-statistical">
            <div className="box">
              <div className="box-header">
                <label className="box-header-title">Tài liệu</label>
              </div>
              <div className="box-body documents">
                <div className="form-word">
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                  />
                </div>
                <button type="submit">Hoàn thành</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}