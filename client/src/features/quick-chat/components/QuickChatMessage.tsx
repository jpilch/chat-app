import { QuickMessage } from '../types';

function QuickChatMessage({ message }: { message: QuickMessage }) {
    return (
        <div className="quick-message">
            <p className="message__content">
                <span className="message__author">
                    {message.author}: {" "}
                </span>
                {message.content}
            </p>
        </div>
    )
}

export default QuickChatMessage