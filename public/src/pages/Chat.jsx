import {
  BellRinging,
  Paperclip,
  UserCirclePlus,
  UsersThree,
} from "@phosphor-icons/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { allUserRoute } from "../utils/ApiRoutes";

function Chat() {
  return (
    <div className="page w-full h-[100vh] bg-red-200 flex items-center justify-center bg-gradient-to-r from-rose-50 to-teal-50">
      <div
        className="chat-container w-5/6 h-5/6 bg-[#B3D4F2] rounded-[2rem]
      flex gap-[1.25rem] p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
      >
        <ContactsContainer />
        <ChatContainer />
      </div>
    </div>
  );
}

function ContactsContainer() {
  const [openMyProfile, setOpenMyProfile] = useState(false);

  return (
    <div className="w-1/3 h-full bg-zinc-200 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden flex flex-col">
      <div className="chat-header w-full min-h-[4.5rem] rounded-t-xl bg-zinc-100 shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 flex items-center pl-6 pr-6 justify-between">
        <div
          className="w-12 h-12 bg-red-200 rounded-full overflow-hidden bg-contain border-[#00223f] border-[1.5px]"
          onClick={() => setOpenMyProfile(!openMyProfile)}
        >
          <img src="../src/assets/pic.jpeg" alt="profilePic" />
        </div>
        <div className="flex items-center gap-3">
          <BellRinging size={24} color="#00223f" className="mouse-cursor" />
          <UserCirclePlus size={24} color="#00223f" />
          <UsersThree size={24} color="#00223f" />
        </div>
      </div>

      {openMyProfile ? <MyProfile /> : <ContactsSection />}
    </div>
  );
}

function MyProfile() {
  return (
    <div className="profile-section flex flex-col p-20 gap-10 items-center w-full bg-zinc-100 flex-grow overflow-auto rounded-b-xl">
      <div className="w-[10rem] h-[10rem] bg-red-300 rounded-full overflow-hidden">
        <img src="../src/assets/pic.jpeg" alt="profilePic" />
      </div>
      <div className="flex flex-col gap-5 items-center">
        <span>NAME</span> <span>ABOUt</span>
      </div>
    </div>
  );
}

function ContactsSection() {
  const [contacts, setContacts] = useState([]);

  const { userId } = useParams();

  const [selected, setSelected] = useState(-1);

  // we will verify userID using custum hook later

  const navigate = useNavigate();

  // console.log(userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const response = await fetch(`${allUserRoute}/${userId}`);

          // console.log(response);

          const data = await response.json();

          if (data.status === true) {
            setContacts(data.users);
          }

          console.log(data.users);
        }
      } catch (error) {
        // toast(error);
      }
    };

    fetchData();
  }, [userId]);

  console.log(contacts);

  return (
    <div className="chat-section w-full bg-zinc-100 flex-grow overflow-auto rounded-b-xl">
      {contacts.map((contact, index) => {
        return (
          <ContactBox
            key={index}
            current={index}
            contact={contact}
            setSelected={setSelected}
            isSelected={selected === index}
          />
        );
      })}
    </div>
  );
}

function ContactBox({ contact, current, isSelected, setSelected }) {
  return (
    <div
      onClick={() => setSelected(current)}
      className={`w-full h-[4.5rem] flex items-center p-5 gap-5 border-b-[1px] border-zinc-400 transition duration-400 ${
        isSelected ? "bg-[#B3D4F2] shadow-md z-50 rounded-xl border-0 " : ""
      }`}
    >
      <div className="image-box w-10 h-10 bg-zinc-600 rounded-full overflow-hidden bg-cover ">
        <img src={contact.avatarImage} alt="profilePic" />
      </div>
      <span>{contact.username}</span>
    </div>
  );
}

function ChatContainer() {
  return (
    <div className="w-2/3 h-full bg-zinc-200 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden flex flex-col">
      <div className="chat-header w-full min-h-[4.5rem] rounded-t-xl bg-zinc-100 shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 flex items-center pl-6 pr-6 gap-5">
        <div className="w-12 h-12 bg-zinc-600 rounded-full overflow-hidden bg-contain border-[#00223f] border-[1.5px]">
          <img src="../src/assets/pic.jpeg" alt="profilePic" />
        </div>
        <div className="flex items-center gap-3">Profile 1</div>
      </div>

      <div className="chat-section w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-[url('../src/assets/background.jpeg')] bg-contain flex-grow"></div>

      <div className="chat-header w-full min-h-[4.5rem] rounded-b-xl bg-zinc-100 shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 flex items-center pl-6 pr-6 gap-5 justify-between">
        <Paperclip size={24} />
        <input
          type="text"
          placeholder="type something..."
          className="w-full h-1/2 rounded-full p-5 text-sm"
        />
      </div>
    </div>
  );
}

export default Chat;
