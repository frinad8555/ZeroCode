import "./EditorScreen.scss";
import Editor from "@monaco-editor/react";
import { useContext, useRef, useState } from "react";
import { PlayContext } from "../../Provider/PlaygroundProvider";

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

export const EditorScreen = ({ fileId, folderId, runCode }) => {
    const { getDefaultCode, getLang, editLang, saveCode, getFileName } = useContext(PlayContext);
    const [code, setCode] = useState(() => getDefaultCode(fileId, folderId));
    const [lang, setLang] = useState(() => getLang(fileId, folderId));
    const [theme, setTheme] = useState(() => localStorage.getItem("editor-theme") || "vs-dark");
    const ref = useRef(code);
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
                ref.current = importedCode;
            }
        }
        else {
            alert("Please choose a valid file.")
        }
    }
    const onExportCode = () => {
        const curCode = ref.current?.trim();
        if (!curCode) {
            alert("Please enter some code.");
        }
        else {
            const blob = new Blob([curCode], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `code.${extensions[lang]}`;
            link.click();
        }
    }
    const onChangeLang = (e) => {
        editLang(fileId, folderId, e.target.value);
        const newCode = getDefaultCode(fileId, folderId);
        setCode(newCode);
        ref.current = newCode;
        setLang(e.target.value);
    }
    const onChangeTheme = (e) => {
        const selectedTheme = e.target.value;
        setTheme(selectedTheme);
        localStorage.setItem("editor-theme", selectedTheme);
    }
    const onSaveCode = () => {
        saveCode(fileId, folderId, ref.current);
        alert("Code Saved Succesfully!");
    }
    const onRunCode = () => {
        runCode(ref.current, lang);
    }


    return (
        <div className="sub-container">
            <div className="editor-header">
                <div className="left-part">
                    <b className="title">{getFileName(fileId, folderId)}</b>
                    <button onClick={onSaveCode}>Save</button>
                </div>
                <div className="right-part">
                    <select onChange={onChangeLang} value={lang}>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                    </select>

                    <select onChange={onChangeTheme} value={theme}>
                        <option value="vs-dark">VS-Dark</option>
                        <option value="vs-light">VS-Light</option>
                    </select>

                </div>
            </div>
            <div className="editor-body">
                <Editor height={"100%"} language={lang} options={editorOps} theme={theme} onChange={onChangeCode} value={code} />
            </div>
            <div className="editor-footer">
                <label htmlFor="import-code">
                    <span className="material-symbols-outlined">upload</span>
                    <b>Import Code</b>
                </label>
                <input type="file" id="import-code" style={{ display: 'none' }} onChange={onImportCode} />
                <button onClick={onExportCode}>
                    <span className="material-symbols-outlined">download</span>
                    <b>Export Code</b>
                </button>
                <button onClick={onRunCode}>
                    <b>Run</b>
                    <span className="material-symbols-outlined">arrow_forward_ios</span>
                </button>
            </div>
        </div>
    )
}