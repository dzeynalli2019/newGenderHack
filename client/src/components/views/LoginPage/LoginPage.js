import React, {useState} from 'react'
//import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

import styled from "styled-components";
import {Button, Form } from 'react-bootstrap';

import Logo from '../images/logo.png'


function LoginPage(props){
    const dispatch = useDispatch();

    // Type 'useState' + Tab key
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // To avoid reloading the page every time clicking the 'login' button.

        let body ={
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    props.history.push('/')
                }
                else{
                    alert('Your account does NOT exist. Please register your account first.')
                    props.history.push('/register')
                }
            })        
    }

    return (
        <Container>
            <img src={Logo}/>
            <StyledForm onSubmit={onSubmitHandler}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" value={Email} onChange={onEmailHandler} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" value={Password} onChange={onPasswordHandler}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
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


export default withRouter(LoginPage)