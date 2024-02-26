/* eslint react/prop-types: 0 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import axios from "axios";
import styled from "styled-components";
import { uploadPic } from "../utils/ApiRoutes";
import { toast } from "react-toastify";

function SetAvatar() {
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const setProfilePicture = async () => {
    try {
      const response = await fetch(uploadPic, {
        method: "POST",
        headers: {
          "content/type": "application/json",
        },
        body: JSON.stringify(selectedAvatar),
      });

      if (!response.ok) {
        toast.error(response.msg);
      }

      console.log(response);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center text-zinc-800 font-['Rubik'] bg-[url('./src/assets/9240809.jpg')] bg-contain bg-no-repeat bg-center">
      <div className="w-[30rem] h-[25rem] flex flex-col items-center rounded-xl border-[1.5px] border-zinc-500 bg-zinc-50 shadow-[rgba(13,_38,_76,_0.5)_0px_9px_20px] overflow-hidden relative">
        {/* <Avatar
          selectedAvatar={selectedAvatar}
          setSelectedAvatar={setSelectedAvatar}
        /> */}
        {/* <div className="absolute top-[50%] -translate-y-[50%] bg-slate-100 h-[5px] w-[5px]rounded-full flex items-center justify-center p-2 text-sm font-regular text-zinc-500">
          <h1>OR</h1>
        </div> */}
        <Photopicker />
        {/* <Button className="submit-btn w-1/2 mb-10" onClick={setProfilePicture}>
          submit
        </Button> */}
      </div>
    </div>
  );
}

function Avatar({ selectedAvatar, setSelectedAvatar }) {
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(undefined);

  const api = `https://api.multiavatar.com/Binx Bond.png`;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const response = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = Buffer.from(response.data, "binary");
          data.push(buffer.toString("base64"));
        }
        console.log(data);
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container
      className="w-full h-1/2 border-b-[1px] border-zinc-500 flex
    flex-col items-center gap-2"
    >
      <div className="title-container mt-5">
        <h1 className="text-xl font-medium">Pick Avatar</h1>
      </div>
      <div className="avatars p-10">
        {avatars.map((item, index) => {
          return (
            <div
              key={index}
              className={`avatar ${
                selected === index ? "selected" : ""
              } overflow-hidden`}
            >
              <img
                src={`data:image/svg+xml;base64,${item}`}
                alt="avatar"
                onClick={() => setSelected(index)}
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
}

function Photopicker({ selectedAvatar, setSelectedAvatar }) {
  const navigate = useNavigate();

  const [image, setImage] = useState();

  const storedUserData = localStorage.getItem("chat-app-user");
  const userData = JSON.parse(storedUserData);

  // useEffect(() => {
  //   if (storedUserData.isAvatarImageSet === true) {
  //     navigate("/");
  //   }
  // }, [storedUserData, navigate]);

  const onInputChange = (e) => {
    const file = e.target.files[0];

    setImage(file);
  };
  const submitImage = async (e) => {
    e.preventDefault();
    try {
      if (!image) return;

      const formData = new FormData();

      formData.append("image", image);

      const userId = userData._id;

      formData.append("userId", userId);

      const response = await fetch(uploadPic, {
        method: "POST",
        headers: {
          // "content/type": "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();

        toast.error(errorData.msg);
        return;
      }

      const data = await response.json();

      console.log(data);

      if (data.status === true) {
        toast(data.msg);
        // localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        // navigate("/");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div
      className="w-full h-1/2 flex
  flex-col items-center gap-5"
    >
      <div className="title-container mt-5">
        <h1 className="text-xl font-medium">Choose Photo</h1>
      </div>

      <form className="ml-[9rem] flex flex-col gap-2" onSubmit={submitImage}>
        <input type="file" accept="images/*" onChange={onInputChange} />
        <Button className="w-1/2 mb-2" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

// bg-[url('./src/assets/9240809.jpg')] bg-contain bg-no-repeat bg-center
export default SetAvatar;

const Container = styled.div`
  .avatars {
    display: flex;
    gap: 20px;

    .avatar {
      /* border: 0.4rem solid transparent; */
      /* padding: 0.4rem; */
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.2s ease-in-out;
      box-shadow: 0px 0px 10px #555;
      height: 5rem;
      width: 5rem;

      img {
        height: 6rem;
        width: 6rem;
        border-radius: 100%;
        /* transition: 0.1s ease-in-out; */
      }
    }

    .avatar:hover {
      transform: scale(1.2);
      box-shadow: 0px 0px 10px #ededed;
    }
    .selected {
      border: 3px solid #333;
      transform: scale(1.2);
    }
  }
`;

const Button = styled.button`
  background-color: #0171d3;
  color: white;
  padding: 0.2rem 2rem;
  border: 0.2px solid #333;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: #0171d3;
  }
`;
