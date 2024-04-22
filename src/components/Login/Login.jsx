import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { fetchUser } from '../../redux/slices/CurrentlyUserSlice'
import style from './Login.module.scss'

const Login = () => {
	const [selectedRole, setSelectedRole] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()
	const { me, status } = useSelector(state => state.fetchUser)

	const handleRoleChange = e => {
		setSelectedRole(e.target.value)
	}

	const handlerSubmit = e => {
		e.preventDefault()

		if (!email || !password) {
			alert('Заполните все поля!')
			return
		}

		if (!selectedRole) {
			alert('Выберите роль!')
			return
		}

		const user = {
			email,
			password,
			userType: selectedRole,
		}
		console.log(user)
		dispatch(fetchUser(user))
	}
	console.log(me)
	return (
		<div className={style.wrapperRoot}>
			<form className={style.wrapperForm} onSubmit={handlerSubmit}>
				<h2>Вход</h2>
				<label className={style.labelTextInput} htmlFor=''>
					Электронная почта
				</label>
				<input
					className={style.inputText}
					type='text'
					onChange={e => setEmail(e.target.value)}
				/>
				<label className={style.labelTextInput} htmlFor=''>
					Пароль
				</label>
				<input
					className={style.inputText}
					type='password'
					onChange={e => setPassword(e.target.value)}
				/>
				<h3>Войти как:</h3>
				<div className={style.wrapperInputs}>
					<div>
						<input
							type='radio'
							name='userType'
							id='teacher'
							value='teacher'
							onChange={handleRoleChange}
						/>
						<label htmlFor='teacher'>Учитель</label>
					</div>
					<div>
						<input
							type='radio'
							name='userType'
							id='parent'
							value='parent'
							onChange={handleRoleChange}
						/>
						<label htmlFor='parent'>Родитель</label>
					</div>
					<div className={style.btnRadio}>
						<input
							type='radio'
							name='userType'
							id='student'
							value='student'
							onChange={handleRoleChange}
						/>
						<label htmlFor='student'>Ученик</label>
					</div>
				</div>
				<button className={style.btnStyle} type='submit'>
					Войти
				</button>
				{status === 'error' && (
					<p className={style.errorText}>Неверный логин или пароль!</p>
				)}
				{me && me.typeUser === 'teacher' && me.isTeacher && (
					<Navigate to='/TeacherPanel' />
				)}
				{me && me.typeUser === 'student' && <Navigate to='/student/panel' />}
				{me && me.typeUser === 'parent' && <Navigate to='/parent/panel' />}
			</form>
		</div>
	)
}

export default Login
