import styled from 'styled-components'

export const LoginWrapper = styled.div`
	background-color: #eeeeee;
	height: 100vh;
	.fixed {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 62%;
		transform: translate(-50%, -50%);
	}
	.imgBanner {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
    .flexCenter{
        width:100%;
        img{
            display: flex;
        }
    }
	input {
		padding: 12px;
	}
    button{
        width: 100%;
    }
`

export const BoxFormWrapper = styled.div`
	background-color: #f7f7f7;
	padding: 35px;
	.imgAvatar {
		margin: 0 auto;
		min-width: 98px;
		height: 98px;
		overflow: hidden;
		border-radius: 100%;
		margin-bottom: 40px;
	}
`
