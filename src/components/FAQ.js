import React, {useState, useEffect} from 'react'
import ReactMarkdown from 'react-markdown'
import faqpath from "./markdown/FAQ.md"

const FAQ = () => {
    const [faq, setFaq] = useState('')
    useEffect(() => {
        fetch(faqpath).then(res => res.text()).then(text => setFaq(text));
    })
    return <div className="docs"><ReactMarkdown children={faq} /></div>
}

export default FAQ