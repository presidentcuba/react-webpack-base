// Libraries
import React from 'react'
import { Divider, Dropdown, Menu, PageHeader } from 'antd'

// Hooks
import { useAppDispatch, useAppSelector } from '@/hooks'

// Store
import { authActions, userInfoSelector } from '@/store/reducers/authSlice'

const Home: React.FC = () => {
	const userInfo = useAppSelector(userInfoSelector)
	const dispatch = useAppDispatch()

	const handleLogout = () => {
		dispatch(authActions.logoutRequest())
	}

	const handleClickItem = (data) => {
		if (data.key === '4') {
			handleLogout()
		}
	}

	const menu = (
		<Menu onClick={handleClickItem}>
			<Menu.Item key={1}>Thông tin cá nhân</Menu.Item>
			<Menu.Item key={2}>Quản lý cache</Menu.Item>
			{/* <Divider key={3} style={{ margin: 0 }} /> */}
			<Menu.Item key={4}>Đăng xuất</Menu.Item>
		</Menu>
	)

	return (
		<div>
			<PageHeader
				ghost={false}
				title={<img src='assets/images/TMSLogo.png' alt='logo' height={60} />}
				subTitle='This is a subtitle'
				extra={[
					<Dropdown key={1} overlay={menu} placement='bottomRight' trigger={['click']}>
						<div style={{ borderRadius: '50%', overflow: 'hidden', cursor: 'pointer' }}>
							<img src={userInfo.DefaultPictureURL} alt='avatar' width={50} height={50} />
						</div>
					</Dropdown>,
				]}
				style={{ padding: '0 20px' }}
			/>
			<div>Content</div>
		</div>
	)
}

export default Home
