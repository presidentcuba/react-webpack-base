import { Button, Input } from 'antd'
import React, { useState } from 'react'

interface LoginModel {
	username: string
	password: string
}

const Login: React.FC = (props) => {
	const [formLogin, setFormLogin] = useState<LoginModel>({
		username: '',
		password: '',
	})
	const onChange = (e) => {
		setFormLogin({
			...formLogin,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<div className='wrapper-login'>
			<div>
				<Input onChange={onChange} type='text' name='username' placeholder='Nhập vào username' />
			</div>
			<div>
				<Input onChange={onChange} type='password' name='password' placeholder='Nhập password' />
			</div>
			<Button>Đăng nhập</Button>
		</div>
	)
}

export default Login
