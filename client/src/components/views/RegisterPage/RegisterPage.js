import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

import styled from "styled-components";
import {Button, Form } from 'react-bootstrap';

import Logo from '../images/logo.png'


function RegisterPage(props) {
    const dispatch = useDispatch();

    // Type 'useState' + Tab key
    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // To avoid reloading the page every time clicking the 'login' button.

        if(Password !== ConfirmPassword){
            return alert("ERROR: Password and Confirm password does NOT match.")
        }

        let body ={
            email: Email,
            name: Name,
            password: Password
        }
        
        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success){
                    props.history.push("/login")
                } else {
                    alert("Failed to sign up")
                }
            })
    }

    return (
        <Container>
             <img src={Logo}/>
            <StyledForm
                onSubmit={onSubmitHandler}
            >
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Email" value={Email} onChange={onEmailHandler} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Name"  type="text" value={Name} onChange={onNameHandler} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" value={Password} onChange={onPasswordHandler}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Confirm Password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </StyledForm>
        </Container>
    )
}

const Container = styled.div`
    
    display: flex;
    justify-content: center;
    align-items: center;
    
`;

const StyledForm = styled(Form)`
    width: 35%;
    padding: 70px;
    text-align: center;
`;

export default withRouter(RegisterPage)