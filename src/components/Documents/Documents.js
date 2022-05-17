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
import axios from "axios";
import {API_URL} from '../../actions/types'

export default function Documents() {
  const {user} = useSelector(state=>state.user);
  
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [text,setText] = useState('<p></p>');
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');

  const onChange =(event)=>{
    if(event.target.name == 'title'){
      setTitle(event.target.value)
    }else if(event.target.name == 'description'){
      setDescription(event.target.value);
    }
  }
  
  // const getText=async()=>{
  //   const string = "<p><strong>123123123213</strong></p>"+
  //   "<h1><strong>asdadasd</strong></h1>";
  //   const contentHTML = convertFromHTML(string);
  //   const state = ContentState.createFromBlockArray(contentHTML.contentBlocks,contentHTML.entityMap);
  //   console.log(state)
  //   setEditorState(EditorState.createWithContent(state))
  // }

  const creatDocument = async()=>{
    try {
      const response = await axios.post(`${API_URL}/api/Document`,{
        title,
        description,
        content: text
      })
      if(response.data.success){
        alert(response.data.messages);
        setTitle('');
        setDescription('');
        setText('<p></p>');
        setEditorState(EditorState.createEmpty());
      }else{
        alert(response.data.messages);
      }
    } catch (error) {
      alert(error.toString())
    }
  }
  useEffect(()=>{


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
                  <div className="form-input">
                    <label>Tiêu đề</label>
                    <input className="title" type="text" onChange={onChange} value={title} name="title"/>
                  </div>
                 
                  <div className="form-input">
                    <label>Mô tả</label>
                    <input className="description" type="text" onChange={onChange} value={description} name="description"/>
                  </div>
                  <label>Nội dung</label>
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={(event)=>{
                      setEditorState(event)
                      setText( draftToHtml(convertToRaw(editorState.getCurrentContent())));
                    }}
                    
                  />
                </div>
                <button type="submit" onClick={()=>creatDocument()}>Hoàn thành</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}