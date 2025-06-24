import "./EditorScreen.scss";

export const EditorScreen = () => {
    return (
        <div className="sub-container">
            <div className="editor-header">
                <div className="left-part">
                    <b className="title">{"TITLE"}</b>
                    <span className="material-symbols-outlined">edit</span>
                    <button>Save</button>
                </div>
                <div className="right-part">
                    <select>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="js">JavaScript</option>
                        <option value="python">Python</option>
                    </select>

                    <select>
                        <option value="vs-dark">VS-Dark</option>
                        <option value="vs-light">VS-Light</option>
                    </select>
                </div>
            </div>
            <div className="editor-body">
                BODY
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
                <input type="file" id="import-code" style={{ display: 'none' }} />
                <button>
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