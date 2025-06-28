import { createContext, useEffect, useState } from "react";
import { v4 } from "uuid";

export const PlayContext = createContext();
const initData = [
    {
        id: v4(),
        name: 'DSA',
        files: [
            {
                id: v4(),
                filename: 'TRIE Practice',
                language: 'C++',
                default: 'System.out.print("Hello");'
            }
        ]
    },
    {
        id: v4(),
        name: 'MongoDB',
        files: [
            {
                id: v4(),
                filename: 'Mongo Intro',
                language: 'javascript',
                default: 'console.log("Hello");'
            }
        ]
    }
];
export const codeSnippet = {
    ['cpp']: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello C++" << endl;
    return 0;
}
`,
    ['java']: `class Main {
    public static void main(String args[]) {
        System.out.println("Hello JAVA");
    } 
}    
`,
    ['js']: `console.log("Hello");`,
    ['javascript']: `console.log("Hello JS");`,
    ['python']: `print("Hello")`
}
export const languages = {
    ['cpp']: `C++`,
    ['java']: `Java`,
    ['javascript']: `JavaScript`,
    ['js']: 'JavaScript',
    ['python']: `Python`
}
const revLang = {
    ['C++']: 'cpp',
    ['Java']: 'java',
    ['JavaScript']: 'javascript',
    ['Python']: 'python'
}

export const PlaygroundProvider = (props) => {
    const [folders, setFolders] = useState(() => {
        const localData = localStorage.getItem('data');
        if (localData) {
            try {
                return JSON.parse(localData);
            } catch (error) {
                console.error("Error parsing localStorage data:", error);
                localStorage.removeItem('data'); // optional: clean up invalid data
                return initData;
            }
        }
        return initData;
    });

    const createNewPlayground = (newPlayground) => {
        const newFolders = [...folders];
        const { folderName, fileName, language } = newPlayground;
        newFolders.push({
            id: v4(),
            name: folderName,
            files: [
                {
                    id: v4(),
                    filename: fileName,
                    language: languages[language],
                    default: codeSnippet[language]
                }
            ]
        })
        localStorage.setItem('data', JSON.stringify(newFolders));
        setFolders(newFolders);
    }

    const createNewFolder = (folderName) => {
        const newFolder = {
            id: v4(),
            name: folderName,
            files: []
        }

        const allFolders = [...folders, newFolder];
        localStorage.setItem('data', JSON.stringify(allFolders));
        setFolders(allFolders);
    }

    const deleteFolder = (id) => {
        const updatedFolders = folders.filter((folder) => {
            return folder.id !== id;
        })

        localStorage.setItem('data', JSON.stringify(updatedFolders));
        setFolders(updatedFolders);
    }

    const editFolder = (id, newName) => {
        const editedFolders = folders.map((folder) => {
            if(folder.id === id) {
                folder.name = newName;
            }
            return folder;
        })

        localStorage.setItem('data', JSON.stringify(editedFolders));
        setFolders(editedFolders);
    }

    const editFile = (folderId, fileId, name) => {
        const copy = [...folders];
        for(let i = 0; i < copy.length; i++) {
            if(folderId === copy[i].id) {
                const files = copy[i].files;
                for(let j = 0; j < files.length; j++) {
                    if(fileId === files[j].id) {
                        files[j].filename = name;
                        break;
                    }
                }
                break;
            }
        }
        localStorage.setItem('data', JSON.stringify(copy));
        setFolders(copy);
    }

    const deleteFile = (folderId, fileId) => {
        const copy = [...folders];
        for(let i = 0; i < copy.length; i++) {
            if(folderId === copy[i].id) {
                const files = [...copy[i].files];
                copy[i].files = files.filter((file) => {
                    return file.id !== fileId;
                })
                break;
            }
        }
        localStorage.setItem('data', JSON.stringify(copy));
        setFolders(copy);
    }

    const createNewFile = (folderId, file) => {
        const copy = [...folders];
        for(let i = 0; i < copy.length; i++) {
            if(folderId === copy[i].id) {
                copy[i].files.push(file);
            }
        }
        localStorage.setItem('data', JSON.stringify(copy));
        setFolders(copy);
    }

    const getDefaultCode = (fileId, folderId) => {
        for(let i = 0; i < folders.length; i++) {
            if(folders[i].id === folderId) {
                for(let j = 0; j < folders[i].files.length; j++) {
                    const curFile = folders[i].files[j];
                    if(fileId === curFile.id) {
                        return curFile.default;
                    }
                }
            }
        }
    }

    const getLang = (fileId, folderId) => {
        for(let i = 0; i < folders.length; i++) {
            if(folders[i].id === folderId) {
                for(let j = 0; j < folders[i].files.length; j++) {
                    const curFile = folders[i].files[j];
                    if(fileId === curFile.id) {
                        return revLang[curFile.language];
                    }
                }
            }
        }
    }

    const editLang = (fileId, folderId, newLang) => {
        const newFolders = [...folders];

        for(let i = 0; i < newFolders.length; i++) {
            if(newFolders[i].id === folderId) {
                for(let j = 0; j < newFolders[i].files.length; j++) {
                    const curFile = newFolders[i].files[j];
                    if(fileId === curFile.id) {
                        newFolders[i].files[j].default = codeSnippet[newLang];
                        newFolders[i].files[j].language = languages[newLang];
                    }
                }
            }
        }
        localStorage.setItem('data', JSON.stringify(newFolders));
        setFolders(newFolders);
    }

    const saveCode = (fileId, folderId, newCode) => {
        const newFolders = [...folders];
        for(let i = 0; i < newFolders.length; i++) {
            if(newFolders[i].id === folderId) {
                for(let j = 0; j < newFolders[i].files.length; j++) {
                    if(fileId === newFolders[i].files[j].id) {
                        newFolders[i].files[j].default = newCode;
                    }
                }
            }
        }
        localStorage.setItem('data', JSON.stringify(newFolders));
        setFolders(newFolders);
    }

    const getFileName = (fileId, folderId) => {
        for(let i = 0; i < folders.length; i++) {
            if(folders[i].id === folderId) {
                for(let j = 0; j < folders[i].files.length; j++) {
                    const curFile = folders[i].files[j];
                    if(fileId === curFile.id) {
                        return curFile.filename;
                    }
                }
            }
        }
    }

    useEffect(() => {
        if (!(localStorage.getItem('data'))) {
            localStorage.setItem('data', JSON.stringify(folders));
        }

    }, [])

    const playgroundFeature = {
        folders,
        createNewPlayground,
        createNewFolder,
        deleteFolder,
        editFolder,
        editFile,
        deleteFile,
        createNewFile,
        getDefaultCode,
        getLang,
        editLang,
        saveCode,
        getFileName
    }

    return (
        <PlayContext.Provider value={playgroundFeature}>
            {props.children}
        </PlayContext.Provider>
    );
}