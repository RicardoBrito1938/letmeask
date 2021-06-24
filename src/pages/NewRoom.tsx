
import illustrationIgm from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'
import { Link, useHistory } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'

export function NewRoom() {
    const history = useHistory()
    const {user} = useAuth()

    const [newRoom, setNewRoom] = useState('')

    const handleCreateRoom = async (e : FormEvent) => {
        e.preventDefault()

        if(newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms')

        const fireBaseForm = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })

        history.push(`/rooms/${fireBaseForm.key}`)

    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationIgm} alt="illustration" />
                <strong>Crie salas de Q&amp; A ao-vivo</strong>
                <p>Tire duvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="logo" />
                    
                    <h2>Criar uma nova sala</h2>
                      <form onSubmit={handleCreateRoom}> 
                        <input 
                          type="text" 
                          placeholder="Nome da sala" 
                          onChange={event => setNewRoom(event.target.value)}
                          value={newRoom}
                          />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}