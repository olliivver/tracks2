import styled from "styled-components";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

const { REACT_APP_SERVICE_ID, REACT_APP_PUBLIC_KEY } = window.__RUNTIME_CONFIG__;

const Contact = () => {
  const [butDis, setButDis] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current);
    emailjs
      .sendForm(
        REACT_APP_SERVICE_ID,
        "contact_form",
        form.current,
        REACT_APP_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
      setButDis(true)
      setTimeout(()=>{
        setButDis(false);
        window.location.reload();
      }, 1000)
  };

  return (
    <StyledContact>
      <h2>Contact</h2>
      <form id="formClass" ref={form} onSubmit={sendEmail}>
        <input
          type="email"
          placeholder="email"
          name="reply_to"
          required
        ></input>
        <input
          type="text"
          placeholder="your name"
          required
          name="from_name"
        ></input>
        <StyledTextArea
          type="textarea"
          placeholder="what's up?"
          name="message"
          required
        ></StyledTextArea>
        {butDis ? <p>Thank you!</p> : <button>Submit</button>}
      </form>
    </StyledContact>
  );
};
const StyledContact = styled.div`
  margin: 200px;
  form {
    display: flex;
    flex-direction: column;
    width: 40%;
    input {
      background-color: black;
      margin: 5px 0;
    }
    p {
      margin: auto;
      margin-top: 5px;
      border: 2px solid white;
      width: 35%;
      padding: 1px;
      text-align: center;
    }
    button {
      cursor: pointer;
      background-color: black;
      width: 35%;
      margin: auto;
      margin-top: 5px;
      border: 2px solid white;
    }
  }
  @media (max-width: 1000px) {
    margin: 200px 20px;
    form {
      width: 100%;
    }
  }
`;
const StyledTextArea = styled.textarea`
  height: 10rem;
  background-color: black;
`;
export default Contact;
