import indexedDBLib from '@/library/indexedDBLib'
import { notification } from 'antd'
import Cookies from 'js-cookie'
import { CLIENT_INFO_OBJECT_STORENAME } from './constants'

export const isServer = typeof window !== 'undefined'

export const getCookie = (key: string) => (isServer ? Cookies.get(key) : null)

export const setCookie = (key: string, token: any, expires = 10000) => {
	// const dateExpires = new Date(expires)
	return isServer && token ? Cookies.set(key, token, { expires }) : null
}

export const deleteCookie = (key: string) => Cookies.remove(key)

export function getNewRsaProvider(dwKeySize?: number) {
	// Create a new instance of RSACryptoServiceProvider.
	if (!dwKeySize) dwKeySize = 512
	return new System.Security.Cryptography.RSACryptoServiceProvider(dwKeySize)
}
export function genRSAKey(dwKeySize) {
	//var keySize = Number(document.frmTestRSA.cboRSAKeySize.value);
	var rsa = getNewRsaProvider(dwKeySize)
	const publicKey = rsa.ToXmlString(false)
	const privateKey = rsa.ToXmlString(true)
	return { PublicKey: publicKey, PrivateKey: privateKey }
}
export function getRSAKey(rsaKey, includePrivateParameters) {
	var rsa = getNewRsaProvider()
	// Import parameters from xml.
	rsa.FromXmlString(rsaKey)
	// Export RSA key to RSAParameters and include:
	//    false - Only public key required for encryption.
	//    true  - Private key required for decryption.
	return rsa.ExportParameters(includePrivateParameters)
}

export function encryptData(rsaKey, dwKeySize, plainText) {
	//var plainText = document.frmTestRSA.txtPlainText.value;
	var decryptedBytes = System.Text.Encoding.Unicode.GetBytes(plainText)
	var doOaepPadding = true
	// ------------------------------------------------
	// Encrypt
	// ------------------------------------------------
	var rsa = getNewRsaProvider()
	// Import the RSA Key information.
	rsa.ImportParameters(getRSAKey(rsaKey, false))
	// Encrypt the passed byte array and specify OAEP padding.
	var encryptedBytes = rsa.Encrypt(decryptedBytes, doOaepPadding)
	var encryptedString = System.Convert.ToBase64String(encryptedBytes)
	// ------------------------------------------------
	// Display the encrypted data.
	//var encryptedString = System.BitConverter.ToString(encryptedBytes, "");
	return encryptedString
}

export function decryptData(rsaKey, dwKeySize, encryptedText) {
	//var encryptedBytes = System.Convert.HexStringToBytes($("EncryptedTextBox").value);
	//var encryptData = document.frmTestRSA.txtEncryptedText.value;
	var encryptedBytes = System.Convert.FromBase64String(encryptedText)
	var doOaepPadding = true
	// ------------------------------------------------
	// Decrypt
	// ------------------------------------------------
	var rsa = getNewRsaProvider()
	// Import the RSA Key information.
	rsa.ImportParameters(getRSAKey(rsaKey, true))
	// Decrypt the passed byte array and specify OAEP padding.
	var decryptedBytes = rsa.Decrypt(encryptedBytes, doOaepPadding)
	// ------------------------------------------------
	// Display the decrypted data.
	var decryptedString = System.Text.Encoding.Unicode.GetString(decryptedBytes)
	return decryptedString
}

export function encryptData2(rsaKey, dwKeySize, plainText) {
	//var plainText = document.frmTestRSA.txtPlainText.value;
	var bytes = System.Text.Encoding.Unicode.GetBytes(plainText)
	//console.log('plain text byte2');
	//console.log(bytes);
	var doOaepPadding = true
	// ------------------------------------------------
	// Encrypt
	// ------------------------------------------------
	var rsa = getNewRsaProvider()
	// Import the RSA Key information.
	rsa.ImportParameters(getRSAKey(rsaKey, false))
	const keySize = dwKeySize / 8
	const maxLength = keySize - 42
	const dataLength = bytes.length
	const iterations = dataLength / maxLength
	var sb = new System.Text.StringBuilder()
	//console.log(maxLength);
	for (let i = 0; i <= iterations; i++) {
		const tempLength = dataLength - maxLength * i > maxLength ? maxLength : dataLength - maxLength * i
		//console.log(tempLength);
		var tempBytes = new Array(tempLength)
		//console.log(tempBytes.length);
		System.Buffer.BlockCopy(bytes, maxLength * i, tempBytes, 0, tempBytes.length)
		//console.log('tempBytes');
		//console.log(tempBytes);
		let encryptedBytes = rsa.Encrypt(tempBytes, doOaepPadding)
		//console.log('encrypted text byte2');
		//console.log(encryptedBytes);

		System.Array.Reverse(encryptedBytes)
		//console.log('encrypted text byte2 Reverse');
		//console.log(encryptedBytes);

		sb.Append(System.Convert.ToBase64String(encryptedBytes))
	}

	return sb.ToString()
}

export function decryptData2(rsaKey, dwKeySize, encryptedText) {
	//var encryptedBytes = System.Convert.HexStringToBytes($("EncryptedTextBox").value);
	//var encryptData = document.frmTestRSA.txtEncryptedText.value;
	var rsa = getNewRsaProvider()
	// Import the RSA Key information.
	rsa.ImportParameters(getRSAKey(rsaKey, true))
	const doOaepPadding = true
	//const base64BlockSize = parseInt(((dwKeySize / 8) % 3 != 0) ? (((dwKeySize / 8) / 3) * 4) + 4 : ((dwKeySize / 8) / 3) * 4);
	const base64BlockSize = parseInt(
		Math.floor(dwKeySize / 8) % 3 != 0
			? Math.floor(Math.floor(dwKeySize / 8) / 3) * 4 + 4
			: ((Math.floor(Math.floor(dwKeySize / 8) / 3) * 4) as any)
	)

	//const base64BlockSize1 = parseInt(((Math.floor(dwKeySize / 8) % 3 != 0) ? (((Math.floor(dwKeySize / 8)) / 3) * 4) + 4 : ((Math.floor(dwKeySize / 8)) / 3) * 4);

	//console.log(encryptedText.length);
	/*if(base64BlockSize > encryptedText.length )
			base64BlockSize = encryptedText.length;*/
	//console.log(base64BlockSize1);
	//console.log(base64BlockSize);
	const iterations = encryptedText.length / base64BlockSize
	//console.log(iterations);
	//console.log("encryptedText.length:  " + encryptedText.length.toString());
	let lstencryptedBytes = new Array(0)
	for (let i = 0; i < iterations; i++) {
		const startIndex = base64BlockSize * i
		let tempText = encryptedText.substr(startIndex, base64BlockSize)

		//console.log('----');
		//console.log("i: " + i.toString() + " - Start Index: " + startIndex.toString() +  " - tempText length: "+ tempText.length.ToString() + " -base64BlockSize: " + base64BlockSize.toString());
		//console.log('TextText:' + tempText) ;
		//console.log('----');

		let encryptedBytes = System.Convert.FromBase64String(tempText)
		//console.log('encrypted text byte2');
		//console.log(encryptedBytes);
		System.Array.Reverse(encryptedBytes)
		//console.log('encrypted text byte2 Reverse');
		//console.log(encryptedBytes);
		let decryptedBytes = rsa.Decrypt(encryptedBytes, doOaepPadding)
		//console.log('decryptedBytes');
		//console.log(decryptedBytes);
		lstencryptedBytes = lstencryptedBytes.concat(decryptedBytes)
		//console.log('lstencryptedBytes');
		//console.log(lstencryptedBytes);
	}

	const decryptedString = System.Text.Encoding.Unicode.GetString(lstencryptedBytes)
	return decryptedString
}

export const getRegisterClientByHostname = async (hostname: string) => {
	const db = new indexedDBLib(CLIENT_INFO_OBJECT_STORENAME)

	const result = await db.get(hostname)

	return result
}

export const openNotification = (type, message) => notification[type]({ message })
