import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const {onSent,prevPromts,setRecentPromt,newChat} = useContext(Context);

    const loadPromt = async(promt) =>{
        setRecentPromt(promt);
        await onSent(promt)
    }
    return (
        <div className={`sidebar ${extended ? 'extended' : ''}`}>
            <div className="top">
                <img
                    onClick={() => setExtended((prev) => !prev)}
                    src={assets.menu_icon}
                    alt="Menu"
                    className="menu"
                />
                <div onClick={()=> newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="New Chat" />
                    {extended && <p>New Chat</p>}
                </div>
                {extended && (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPromts.map((item,index)=>{
                            return (
                                <div onClick={()=>loadPromt(item)} className="recent-entry" key={index}>
                                    <img src={assets.message_icon} alt="Message" />
                                    <p>{item.slice(0,18)} ...</p>
                                </div>
                            )
                        })}
                        
                    </div>
                )}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="Help" />
                    {extended && <p>Help</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="Activity" />
                    {extended && <p>Activity</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="Settings" />
                    {extended && <p>Settings</p>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;