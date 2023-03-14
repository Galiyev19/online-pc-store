import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import { useNavigate } from "react-router-dom";
import { useDispatch} from 'react-redux';

//Import Bootstrap Components
import Modal from 'react-bootstrap/Modal';


import './Reg.css'

const RegModal = (props) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorFB, setErrorFB] = useState("")


  //Hide modal
  const hideModal = () => {
    props.onHide()
    navigate("/");
  }


  //Create new User add on DB
  const signUp = (data) => {
    
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(({ user }) => {
      hideModal()
      localStorage.setItem('token', user.accessToken)
      //addUserOnDBFromInput()
      fetch("/signUp",{
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.accessToken,
          userName: data.userName,
          email: data.email,
          password: data.password,
          orders: []
        }),
      }).then(data => data.json()).then((res) => console.log(res))
    })
    .catch((error) => {
      if (error.code == "auth/email-already-in-use") {
        setErrorFB("The email address is already in use")
      } else if (error.code == "auth/invalid-email") {
        setErrorFB("The email address is not valid.")
      } else if (error.code == "auth/operation-not-allowed") {
        setErrorFB("Operation not allowed")
      } else if (error.code == "auth/weak-password") {
        setErrorFB("The password is too weak.")
      }
    })

}



  const onSubmit = (data) => {
    console.log(data)
  }

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit
  } = useForm({
    mode: "onBlur"
  })
 

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Регистрация
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column'>
        <form className='d-flex flex-column mb-2' onSubmit={handleSubmit(signUp)}>
          <label className='mb-1'>Имя пользователя</label>
          <input placeholder='Имя' type="text" name='userName' className='form-control mb-2'  
          {...register('userName',{
            required: "Поле обязательно к заполнению",
            minLength: {
              value : 3,
              message: "Минимум 3 символа"
            }
          })}
          />
          {errors?.userName && <p className='text-danger'>{errors?.userName?.message || "Error"}</p>}

          <label className='mb-1'>Почта</label>
          <input placeholder='Почта' type="email" name='email' className='form-control mb-2'
             {...register('email',{
            required: "Поле обязательно к заполнению",
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Пожалуйста, введите действительный адрес электронной почты!"
            }
          })}
          />
           {errors?.email && <p className='text-danger'>{errors?.email?.message || "Error"}</p>}

          <label className='mb-1'>Пароль </label>
          <input placeholder='Пароль' type="password" name='password' className='form-control mb-2' 
             {...register('password',{
            required: "Поле обязательно к заполнению",
            minLength: {
              value : 8,
              message: "Минимум 8 символа"
            }
          })}
          />
          {errors?.password && <p className='text-danger'>{errors?.password?.message || "Error"}</p>}
          {errorFB !== "" ? <span className="text-danger">{errorFB}</span> : null}
        <div className='d-flex flex-column  text-center align-items-center w-100 justify-content-center mt-2'>
          <button className='btn btn-primary w-75 fw-bold mb-2' type='submit'>ЗАРЕГИСТРИРОВАТЬСЯ</button>
          <p>Регистрируясь, вы соглашаетесь с пользовательским соглашением</p>
        </div>
        </form>
      </Modal.Body>
      <Modal.Footer className='d-flex flex-column'>
        <div className='d-flex flex-column justify-content-between text-center'>
          <div className='d-flex text-cente mt-3'>
            <p>Уже есть зарегестрированы?<span className='text-primary'>Войти</span></p>
          </div>
        </div>
      </Modal.Footer>
    </Modal>



  )

}


export default RegModal;