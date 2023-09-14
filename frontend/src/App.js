import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import gptImgLogo from "./assets/robot-assistant.png";
import profile from "./assets/profile.png";
import Loading from "./loading";




function App() {
    const msgEnd = useRef(null);

    const [input, setInput] = useState("");
    const [loading , setLoading] = useState(false);
    const [message, setMessage] = useState([
        {
            text: "Hi, I am AI BOT , a state-of-the-art language model",
            isBot: true
        }
    ]);

    useEffect(() => {
        msgEnd.current.scrollIntoView();
    }, [message]);

    useEffect(() => {
       if(loading === true){
          
       }
    }, [loading])

    const handlleNewChat = async () => {
        window.location.reload();
    }

    const handleClick = async () => {
        const text = input;
        setInput("");
        setLoading(true);
        setMessage([
            ...message,
            { text, isBot: false },
        ]);

        const res = await fetch(`http://localhost:4000/api/bardApi?ques=${text}`);
        const result = await res.json();

        if (result.data === undefined) {
            result.data = "currently i am unable to answer your question"
        }

        setMessage([
            ...message,
            { text, isBot: false },
            { text: result.data, isBot: true }
        ]);

        setLoading(false);
    }

    const handleEnter = async (e) => {
        if (e.key === "Enter") {
            await handleClick();
        }
    }

    const handleQuery = async (e) => {
        const text = e.target.value;
        setLoading(true);
        setMessage([
            ...message,
            { text, isBot: false },
        ]);

        const res = await fetch(`http://localhost:4000/api/bardApi?ques=${text}`);
        const result = await res.json();

        if (result.data === undefined) {
            result.data = "currently i am to answer your question"
        }

        setMessage([
            ...message,
            { text, isBot: false },
            { text: result.data, isBot: true }
        ]);
        setLoading(false);
    }

    return (
        <div className="App">
            <div className="sideBar">
                <div className="upperSide">
                    <div className="upperSideTop">
                        <img src={gptLogo} className="logo" />
                        <span className="brand">AI BOT</span>
                    </div>

                    <button className="midBtn" onClick={handlleNewChat}>
                        <img src={addBtn} alt="new chat" className="addBtn" />
                        New Chat
                    </button>

                    <div className="upperSideBottom">
                        <button className="query" onClick={handleQuery} value={"What is programming?"}><img src={msgIcon} alt="Query" />What is programming?</button>
                        <button className="query" onClick={handleQuery} value={"How to use an API?"}><img src={msgIcon} alt="Query" />How to use an API?</button>
                    </div>

                </div>
                <div className="lowerSide">
                    <div className="listItems">
                        <img src={home} alt="home" className="listItemsImg" />
                        Home
                    </div>
                    <div className="listItems">
                        <img src={saved} alt="saved" className="listItemsImg" />
                        Saved
                    </div>
                    <div className="listItems">
                        <img src={rocket} alt="rocket" className="listItemsImg" />
                        Upgrade to pro
                    </div>
                </div>
            </div>


            <div className="mainBar">
                <div className="chats">
                    {message.map((message, i) => {
                        return <div key={i} className={message.isBot ? "chat bot" : "chat"}>
                            <img className="chatImg" src={message.isBot ? gptImgLogo : profile} alt="" />
                            <p className="txt">
                                {message.text}
                            </p>
                        </div>
                    })}
                    
                    {loading ? <Loading /> : (<div></div>)}
                    
                    <div ref={msgEnd} />
                </div>

                <div className="chatFooter">
                    <div className="inp">
                        <input type="text" placeholder="type your query" value={input} onKeyDown={handleEnter} onChange={(e) => { setInput(e.target.value) }} />
                        <button className="send" onClick={handleClick}>
                            <img src={sendBtn} alt="send" />
                        </button>
                    </div>
                    <p>
                        AI BOT may produce wrong information about people , places or facts.
                    </p>
                </div>
            </div>


        </div>
    )
}

export default App;