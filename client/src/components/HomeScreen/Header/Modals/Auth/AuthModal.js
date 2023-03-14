import React, { useEffect, useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


//Import Bootstrap Components
import Modal from 'react-bootstrap/Modal';

//React Google Button
import GoogleButton from 'react-google-button'

//Import my local FireBase settings
import auth from '../../../../../firebase'


//import Local Components
import RegModal from '../Reg/Reg';


//import Style
import './AuthModal.css'



const AuthModal = (props) => {

    const {user} = props

    const [modalShow, setModalShow] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)


    const navigate = useNavigate();


    const hideModal = () => {
        props.onHide()
        navigate("/");
    }

    const handleModalRegHide = () => {
        setModalShow(false)
        props.onHide()
        navigate("/")
    }


    const handleLogin = async (data) => {

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                // console.log(user)

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

        const obj = {
            email: data.email,
            password: data.password
        }

        fetch("/signIn", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj),
        }).then(data => data.json()).then((res) => setError(res))



        if(error !== null){
            setError("Username or password incorrect")
        }else{
            hideModal()
            reset()
        }

    }


    // USE FROM HOOK
    const {
        register,
        formState: {
            errors,
        },
        reset,
        handleSubmit
    } = useForm({
        mode: "onBlur"
    })

    useEffect(() => {

    },[error])


    return (

        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Вход
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column'>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className='d-flex flex-column mb-2'>
                        <input placeholder='Почта' name="email" className='form-control mb-2' onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                               {...register('email', {
                                   required: "Поле обязательно к заполнению",
                                   pattern: {
                                       value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                       message: "Пожалуйста, введите действительный адрес электронной почты!"
                                   }
                               })}
                        />
                        {errors?.email && <p className='text-danger'>{errors?.email?.message || "Error"}</p>}
                        <input placeholder='Пароль' type="password" name="password" className='form-control mb-2' onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                               {...register('password', {
                                   required: "Поле обязательно к заполнению",
                               })}
                        />
                        {errors?.password && <p className='text-danger'>{errors?.password?.message}</p>}
                        { error !== null ? <span className="error">{error.message}</span> : null }
                    </div>
                    <div className='d-flex align-items-center w-100 justify-content-center mt-2'>
                        <button className='btn btn-primary w-75 fw-bold' type="submit">ВОЙТИ</button>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer className='d-flex flex-column'>
                <div className='d-flex flex-column justify-content-between text-center'>
                    <div className='d-flex text-cente mt-3'>
                        <p>Нет аккаунта? <span onClick={() => setModalShow(true)}
                                               className='link_reg'>Зарегистрироваться</span></p>
                        <RegModal show={modalShow} onHide={() => handleModalRegHide()} user={user}/>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>


    )

}

export default AuthModal