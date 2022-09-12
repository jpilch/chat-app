import { Comment } from 'react-loader-spinner'

function ComponentLoadingFallback() {
    return (
        <Comment
            visible={true}
            height="80"
            width="80"
            ariaLabel="comment-loading"
            wrapperStyle={{}}
            wrapperClass="comment-wrapper"
            color="#fff"
            backgroundColor="var(--text-color-primary)"
        />
    )
}

export default ComponentLoadingFallback