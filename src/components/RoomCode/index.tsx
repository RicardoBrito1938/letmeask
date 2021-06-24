import copyImg from '../../assets/images/copy.svg'

import '../../styles/roomCode.scss'


type RoomCodeProps = {
    code: string;
}

export function RoomCode(props : RoomCodeProps){


    const copyRoomCodeToClipboard = () => {
        navigator.clipboard.writeText(props.code)
    }


    return (
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="copy" />
            </div>
            <span>sala ${props.code}</span>
        </button>
    )
}