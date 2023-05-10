export const AlertState = (alertType, text, setTimer) => ({
    alertType: alertType ? alertType : 'danger',
    text: text ? text : '',
    show: null,
    setTimer: typeof setTimer == 'boolean' ? setTimer : false
})