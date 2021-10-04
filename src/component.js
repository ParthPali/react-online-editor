import React, { useState } from 'react';
import AceEditor from "react-ace";
import FileSaver from 'file-saver';

import 'ace-builds/src-min-noconflict/ext-searchbox';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-css";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-terminal";

export default function Home() {

    const [fileContent, setFileContent] = useState("");
    const [file,setFile] = useState();
    const [isChanged,set_isChange] = useState(false);
    const [fontSize,setFontSize] = useState("24px");
    const [fileType,setType] = useState("");
    const [theme,setTheme] = useState("terminal");

    const onValueChange = value =>{
        set_isChange(value ? true : false)
        setFileContent(value);
    }

    const setFileType = type =>{
        if(type == "text/html" || type == "text/plain"){
            setType(type.substring(5));
        }
        else{
            setType(type.substring(7));
        }
    }

    const onFileUpload = event =>{

        let read = event.target.files[0];
        setFile(read);

        const reader = new FileReader();

        reader.onload = function(e){
            let content = reader.result;
            setFileContent(content);
            set_isChange(true);
            setFileType(read.type);
        }
        reader.readAsText(read);
    }
    const downloadFile = () => {
        let blob = new Blob([ new TextEncoder().encode(fileContent) ],{type: "text/plain"});
        file ? FileSaver.saveAs(blob,file.name) : FileSaver.saveAs(blob,"sample." + fileType);
    }

    const modeChange = e =>{
        setType(e.target.value);
    }
    const themeChange = e =>{
        setTheme(e.target.value);
    }
    const sizeChange = e =>{
        setFontSize(e.target.value);
    }


    const sizes = ['16px','20px','24px','28px','32px'];
    const modes = ['txt','java','js','python','html','go','css'];
    const themes = ['cobalt','github','terminal'];

    return (
        <div>
            <div className="Main">
                <div className="tools">
                    <div className="row">
                    <div className="col-sm-3">
                        <input type="file" name="file" className="upload" onChange={onFileUpload} />
                    </div>
                    <div className="col-sm-6">
                    <center>
                        <h1 className="title">Parth's Text Editor</h1>
                    </center>
                    </div>
                    <div className="col-sm-3 customize">

                        <select onChange={modeChange} value={fileType} className="mode">
                        {
                            modes.map(value => {
                            return <option value={value} className="mode-option">{value}</option>
                            })
                        }
                        </select>

                        <select onChange={themeChange} value={theme} className="mode">
                        {
                            themes.map(theme => {
                                return <option value={theme} className="mode-option">{theme}</option>
                            })
                        }
                        </select>

                        <select onChange={sizeChange} value={fontSize} className="mode">
                        {
                            sizes.map(size => {
                                return <option value={size} className="mode-option">{size}</option>
                            })
                        }
                        </select>

                        <button onClick={downloadFile} className="download">Save File</button>
                    </div>
                    </div>   
                </div>

                <div className="editor shadow-lg">
                <AceEditor
                    fontSize={fontSize}
                    height='800px'
                    width='100%'
                    onChange={onValueChange}
                    value={fileContent}
                    mode={fileType}
                    theme={theme}
                    name="psquare Editor"
                    placeholder="Code here"
                />
                </div>
            </div>
        </div>
    );
}
