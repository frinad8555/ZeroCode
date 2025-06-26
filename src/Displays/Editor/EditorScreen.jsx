import "./EditorScreen.scss";
import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";

const editorOps = {
    fontSize: 16,
    wordWrap: 'no'
}

const extensions = {
    cpp: 'cpp',
    javascript: 'js',
    java: 'java',
    python: 'py'
}

export const EditorScreen = () => {
    const [code, setCode] = useState("Default Val");
    const [lang, setLang] = useState("cpp");
    const [theme, setTheme] = useState("vs-dark");
    const ref = useRef();
    const onChangeCode = (newcode) => {
        ref.current = newcode;
    }
    const onImportCode = (e) => {
        const file = e.target.files[0];
        const allowedExtensions = ['.jsx', '.cpp', '.java', '.js', '.py'];
        const fileName = file.name.toLowerCase();
        const isValid = allowedExtensions.some(ext => fileName.endsWith(ext));
        if (isValid) {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function (value) {
                const importedCode = value.target.result;
                setCode(importedCode);
            }
        }
        else {
            alert("Please choose a valid file.")
        }
    }
    const onExportCode = () => {
        const curCode = ref.current?.trim();
        if(!curCode) {
            alert("Please enter some code.");
        }
        else {
            const blob = new Blob([curCode], {type: "text/plain"});
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `code.${extensions[lang]}`;
            link.click();
        }
    }
    const onChangeLang = (e) => {
        setLang(e.target.value);
    }
    const onChangeTheme = (e) => {
        setTheme(e.target.value);
    }

    return (
        <div className="sub-container">
            <div className="editor-header">
                <div className="left-part">
                    <b className="title">{"TITLE"}</b>
                    <span className="material-symbols-outlined">edit</span>
                    <button>Save</button>
                </div>
                <div className="right-part">
                    <select onChange={onChangeLang}>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                    </select>

                    <select onChange={onChangeTheme} >
                        <option value="vs-dark">VS-Dark</option>
                        <option value="vs-light">VS-Light</option>
                    </select>
                </div>
            </div>
            <div className="editor-body">
                <Editor height={"100%"} language={lang} options={editorOps} theme={theme} onChange={onChangeCode} value={code} />
            </div>
            <div className="editor-footer">
                <button>
                    <span className="material-symbols-outlined">fullscreen</span>
                    <b>Full Screen</b>
                </button>
                <label htmlFor="import-code">
                    <span className="material-symbols-outlined">upload</span>
                    <b>Import Code</b>
                </label>
                <input type="file" id="import-code" style={{ display: 'none' }} onChange={onImportCode} />
                <button onClick={onExportCode}>
                    <span className="material-symbols-outlined">download</span>
                    <b>Export Code</b>
                </button>
                <button>
                    <b>Run</b>
                    <span className="material-symbols-outlined">arrow_forward_ios</span>
                </button>
            </div>
        </div>
    )
}