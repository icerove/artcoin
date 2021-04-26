import React, {useState, useEffect} from 'react'
import ReactMarkdown from 'react-markdown'
import docpath from "./markdown/Doc.md"

const Doc = () => {
    const [doc, setDoc] = useState('')
    useEffect(() => {
        fetch(docpath).then(res => res.text()).then(text => setDoc(text));
    })
    return <div className="docs"><ReactMarkdown children={doc} /></div>
}

export default Doc