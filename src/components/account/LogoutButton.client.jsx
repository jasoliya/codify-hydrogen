export function LogoutButton(props) {
    const handleClick = () => {
        fetch('/account/logout', {method: 'POST'}).then(() => {
            if(typeof props?.onClick === 'function') {
                props.onClick();
            } else {
                window.location.href = '/';
            }
        })
    }

    return(
        <div>
            <button className="inline-block  text-gray-500 " {...props} onClick={handleClick}>Logout</button>
        </div>
    )
}