import useQuickChatService from "../hooks/useQuickChatService"

function QuickChatWindowInfo() {
    const quickChatService = useQuickChatService()
    return (
        <>
            <p>
                Room ID: {quickChatService.getRoomId()}
            </p>
        </>
    )
}

export default QuickChatWindowInfo