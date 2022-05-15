import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import { Editor } from "react-draft-wysiwyg";
import { EditorState,convertToRaw,convertFromHTML,ContentState} from "draft-js";
import draftToHtml from 'draftjs-to-html'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ContainerLeft from "../Container/ContainerLeft";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Documents.css";
import { async } from "@firebase/util";

export default function Documents() {
  const {user} = useSelector(state=>state.user);
  
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [text,setText] = useState('<p></p>');
 
  const getText=async()=>{
    const string = "<p><strong>123123123213</strong></p>"+
    "<h1><strong>asdadasd</strong></h1>";
    const contentHTML = convertFromHTML(string);
    const state = ContentState.createFromBlockArray(contentHTML.contentBlocks,contentHTML.entityMap);
    console.log(state)
    setEditorState(EditorState.createWithContent(state))
  }
  useEffect(()=>{
    getText();
  },[])
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
                    onEditorStateChange={(event)=>{
                      setEditorState(event)
                      setText( draftToHtml(convertToRaw(editorState.getCurrentContent())));
                    }}
                    
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