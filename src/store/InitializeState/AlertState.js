export const AlertState = (alertType, text, setTimer) => ({
    alertType: alertType ? alertType : 'danger',
    text: text ? text : '',
    show: false,
    setTimer: typeof setTimer == 'boolean' ? setTimer : false
})