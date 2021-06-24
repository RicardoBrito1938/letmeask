import { useHistory, useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg'
import checkIgm from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Questions'

import '../styles/room.scss';
import { useRoom } from '../hooks/userRoom';

import deleteIgm from '../assets/images/delete.svg'
import { database } from '../services/firebase';

type ParamsProps = {
    id : string
}

export function AdminRoom() {
    const params = useParams<ParamsProps>()
    const history = useHistory()

    const {questions, title} = useRoom(params.id) 

    const handleEndRom = async() => {
        database.ref(`rooms/${params.id}`).update({
            endedAt: new Date()
        })

        history.push('/')
    }

    const handleDeleteQuestion = async (questionId: string) => {
        if(window.confirm('Tem certeza que deseja excluir essa pergunta')) {
            await database.ref(`rooms/${params.id}/questions/${questionId}`).remove()
        }
    }

    const handleCheckQuestionAsAnswered = async (questionId: string) => {
        await database.ref(`rooms/${params.id}/questions/${questionId}`).update({
            isAnswered: true,
        })

    }

    const handleHighLightQuestion = async (questionId: string) => {
        await database.ref(`rooms/${params.id}/questions/${questionId}`).update({
            isHighlighted: true,
        })

    }


    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="logo" />
                    <div>
                        <RoomCode  code={params.id} />
                        <Button isOutlined onClick={handleEndRom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <div>
                                    
            </div>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                   {questions.length > 0 && ( <span>{questions.length} pergunta(s)</span>)}
                </div>                

                 <div className="question-list">
                 {questions.map(question => (
                     <Question 
                        key={question.id}
                        content={question.content}
                        author={question.author}
                        isAnswered={question.isAnswered}
                        isHighlighted={question.isHighlighted}
                     >
                       {!question.isAnswered && (
                           <>
                            <button
                            type="button"
                            onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                             <img src={checkIgm} alt='check' />
                            </button>
                             <button
                            type="button"
                            onClick={() => handleHighLightQuestion(question.id)}>
                             <img src={answerImg} alt='answer' />
                             </button>
                           </>
                       )}
                         <button
                            type="button"
                            onClick={() => handleDeleteQuestion(question.id)}>
                             <img src={deleteIgm} alt='delete' />
                         </button>
                     </Question>
                 ))}
                 </div>
            </main>
        </div>
    )
}