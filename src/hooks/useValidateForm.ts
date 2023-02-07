import { useEffect, useState } from 'react'
import * as yup from 'yup'

export const useValidationForm = (formData, yupObject: yup.SchemaOf<any>) => {
	const [flagSubmit, setFlagSubmit] = useState<boolean>(false)
	const [errors, setErrors] = useState<any>({})
	useEffect(() => {
		if (flagSubmit) {
			yupObject
				.validate(formData, { abortEarly: false })
				.then(function () {
					setErrors({})
					setFlagSubmit(false)
				})
				.catch(function (err) {
					let errForm = {}
					err?.inner?.forEach((element) => {
						errForm = {
							...errForm,
							[element.path]: element.message,
						}
					})

					setErrors(errForm)
				})
		}
	}, [formData])

	const onSubmit = (submitForm: () => void) => {
		setFlagSubmit(true)
		yupObject
			.validate(formData, { abortEarly: false })
			.then(function () {
				setErrors({})
				setFlagSubmit(false)
				submitForm()
			})
			.catch(function (err) {
				setFlagSubmit(false)
				let errForm = {}

				err?.inner?.forEach((element) => {
					errForm = {
						...errForm,
						[element.path]: element.message,
					}
				})

				setErrors(errForm)
			})
	}

	return { onSubmit, errors }
}
