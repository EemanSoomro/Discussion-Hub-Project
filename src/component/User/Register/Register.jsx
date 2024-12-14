import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import swal from "sweetalert";
import styled from "styled-components";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const showAlert = (title, text, icon, timer = 1200) => {
    swal({ title, text, icon, button: false, timer });
  };

  const validateForm = () => {
    const { username, email, password, cpassword } = user;

    if (!username || !email || !password || !cpassword) {
      showAlert("Missing Details!", "Kindly fill all the Details", "warning");
      return false;
    }
    if (!email.includes("@") || !email.includes(".")) {
      showAlert(
        "Invalid Email!",
        "Please enter a valid email address",
        "error"
      );
      return false;
    }
    if (password !== cpassword) {
      showAlert(
        "Incorrect Password!",
        "Password and Confirm Password should be the same",
        "error"
      );
      return false;
    }
    if (password.length < 8) {
      showAlert(
        "Weak Password!",
        "Password should be at least 8 characters long",
        "error",
        1800
      );
      return false;
    }
    return true;
  };

  const PostData = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const { username, email, password } = user;

    try {
      const res = await fetch("http://localhost:8800/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      // Check if response status is okay
      if (!res.ok) {
        showAlert(
          "Email or Username Already Exists!",
          "Please Use Another One.",
          "error"
        );
        return;
      }

      showAlert(
        "Registration Successful!",
        "Redirecting to Login Page.",
        "success"
      );

      setTimeout(() => {
        window.location = "/login";
      }, 1000);

      setUser({
        username: "",
        email: "",
        password: "",
        cpassword: "",
      });
    } catch (err) {
      showAlert("Error!", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <SignUp>
      <h2>Sign Up</h2>
      <h3>It's quick & simple</h3>
      <Form onSubmit={PostData}>
        <Textbox>
          <Input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputs}
            required
          />
          <label>Username</label>
          <span>
            <AiOutlineUser />
          </span>
        </Textbox>
        <Textbox>
          <Input
            type="text"
            name="email"
            value={user.email}
            onChange={handleInputs}
            required
          />
          <label>Email</label>
          <span>
            <AiOutlineMail />
          </span>
        </Textbox>
        <Textbox>
          <Input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputs}
            required
          />
          <label>Password</label>
          <span>
            <RiLockPasswordLine />
          </span>
        </Textbox>
        <Textbox>
          <Input
            type="password"
            name="cpassword"
            value={user.cpassword}
            onChange={handleInputs}
            required
          />
          <label>Confirm Password</label>
          <span>
            <RiLockPasswordLine />
          </span>
        </Textbox>
        <Link to="/login">
          <p>Signed up already?</p>
        </Link>
        <Btn type="submit">
          Sign Up
          <span>
            <IoIosArrowForward />
          </span>
        </Btn>
      </Form>
    </SignUp>
  );
};

export default Register;

const Btn = styled.button`
  border: 0;
  background: #3991dd;
  align-items: center;
  cursor: pointer;
  padding: 0 24px;
  border-radius: 6px;
  color: #f9f9f9;
  font-family: inherit;
  font-weight: 600;
  width: 100%;
  height: 50px;
  font-size: 16px;
  text-align: center;
  transition: 0.6s all;
  display: flex;
  justify-content: space-between;
  /* Hover */
  &:hover {
    /* Make the button a little bigger */
    transform: scale(1.05);
    /* Make the button a little darker */
    background: #216ce7;
  }
`;

const Input = styled.input`
  border: 0;
  width: 100%;
  height: 60px;
  background: transparent;
  font-family: inherit;
  font-size: 16px;
  outline: none;

  &:focus ~ label {
    color: #216ce7;
  }

  &:focus {
    border-color: #216ce7;
  }

  /* :is(input:focus, input:valid) ~ label  */
  &:focus ~ label,
  &:valid ~ label {
    translate: -40px -40px;
    scale: 0.875;
  }

  &:focus ~ span,
  &:valid ~ span {
    color: rgb(255 255 255 / 96%);
  }
`;

const SignUp = styled.div`
  position: fixed;
  z-index: 2;
  height: 100%;
  width: 100%;
  max-width: 100%;
  padding: 60px 90px;
  background: #111820;
  text-align: center;
  h2 {
    font-size: 32px;
    font-weight: 600;
    margin: 0 0 6px;
    color: rgb(255 255 255 / 96%);
  }

  h3 {
    font-size: 16px;
    font-weight: 400;
    margin: 0 0 30px;
    color: rgb(255 255 255 / 40%);
  }

  p {
    color: #216ce7;
    text-decoration: none;
    margin: 0 0 22px;
  }
`;

const Form = styled(motion.form)`
  margin: 0;
  display: grid;
  gap: 16px;
  /* If Laptop or desktop screen add padding */
  @media (min-width: 768px) {
    padding: 0 390px;
  }
`;

const Textbox = styled.div`
  position: relative;
  margin-bottom: 16px;

  span {
    position: absolute;
    top: 50%;
    translate: 0 -50%;
    left: 0;
    font-size: 22px;
    pointer-events: none;
    color: rgb(255 255 255 / 40%);
  }

  input {
    padding: 0 24px 0 36px;
    border-bottom: 2px solid #2b3442;
    color: rgb(255 255 255 / 96%);
    height: 72px;
  }

  label {
    position: absolute;
    top: 50%;
    left: 36px;
    translate: 0 -50%;
    color: rgb(255 255 255 / 40%);
    pointer-events: none;
    transition: 0.4s;
  }
`;
