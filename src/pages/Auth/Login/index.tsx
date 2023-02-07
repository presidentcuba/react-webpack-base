// Libraries
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Col, Form, Input, Row } from 'antd'

// Styled
import { BoxFormWrapper, LoginWrapper } from './styled'

// Hooks
import { useAppDispatch, useAppSelector } from '@/hooks'

// Utils
import MD5Digest from '@/library/cryptography/MD5Digest'

// Store
import { authActions, isLoggedInSelector } from '@/store/reducers/authSlice'

// Constants
import { AUTHEN_HOSTNAME } from '@/utility/constants'

const Login: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const isAuthenticated = useAppSelector(isLoggedInSelector)

	useEffect(() => {
		isAuthenticated && navigate('/home')
	}, [isAuthenticated])

	const onFinish = (values: any) => {
		const { username } = values
		const password = MD5Digest(values.password)
		dispatch(authActions.checkRegisterRequest({ hostname: AUTHEN_HOSTNAME, username, password }))
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<LoginWrapper>
			<div className='fixed'>
				<Row gutter={12}>
					<Col flex={'auto'}>
						<img src={'/assets/images/messageImage.jpg'} className='imgBanner' />
					</Col>
					<Col flex={'300px'}>
						<BoxFormWrapper>
							<div className='flexCenter'>
								<img src='/assets/images/avatar_2x.png' className='imgAvatar' />
							</div>
							<Form
								name='basic'
								initialValues={{ remember: true }}
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}
								autoComplete='off'
							>
								<Form.Item name='username' rules={[{ required: true, message: 'Vui lòng điền tên !' }]}>
									<Input placeholder='Tên truy cập' />
								</Form.Item>

								<Form.Item name='password' rules={[{ required: true, message: 'Vui lòng điền mật khẩu !' }]}>
									<Input.Password placeholder='Mật khẩu' />
								</Form.Item>

								<Form.Item name='remember' valuePropName='checked'>
									<Checkbox>Remember me</Checkbox>
								</Form.Item>

								<Form.Item>
									<Button type='primary' htmlType='submit'>
										Đăng nhập
									</Button>
								</Form.Item>
							</Form>
						</BoxFormWrapper>
					</Col>
				</Row>
			</div>
		</LoginWrapper>
	)
}

export default Login
