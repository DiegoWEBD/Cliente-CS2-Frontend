import { useState } from 'react'
import './App.css'

function App() {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await fetch('http://192.168.1.83:3002/auth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			if (response.ok) {
				const data = await response.json()
				console.log('Login successful:', data)
			} else {
				console.error('Login failed:', response.status)
			}
		} catch (error) {
			console.error('Error during fetch:', error)
		}
	}

	return (
		<div className="flex items-center justify-center h-[100vh] ">
			<div className="w-fit bg-white p-4 rounded shadow">
				<h1 className="text-center font-bold mb-3">Iniciar sesión</h1>
				<form onSubmit={handleSubmit} className="flex flex-col gap-3">
					<div className="flex flex-col gap-1">
						<label htmlFor="username">Nombre de usuario</label>
						<input
							type="text"
							id="username"
							name="username"
							value={formData.username}
							onChange={handleChange}
							required
							className="border rounded border-gray-300"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label htmlFor="password">Contraseña</label>
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
							className="border rounded border-gray-300"
						/>
					</div>
					<button
						type="submit"
						className="bg-blue-500 w-full text-white rounded hover:font-semibold hover:bg-blue-600 transition-all"
					>
						Enviar
					</button>
				</form>
			</div>
		</div>
	)
}

export default App
