import AuthWrapper from '../../auth/components/AuthWrapper'
import SocketWrapper from '../components/SocketWrapper';

function Chat() {
    return (
        <AuthWrapper>
            <SocketWrapper />
            <div>Chat</div>
        </AuthWrapper>
    )
}

export default Chat