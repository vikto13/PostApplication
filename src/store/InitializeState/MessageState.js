export const MessageState = (messageType, titleText, bodyText, buttons, show) => ({
    messageType: messageType ? messageType : 'danger',
    titleText: titleText ? titleText : '',
    bodyText: bodyText ? bodyText : '',
    buttons: buttons ? buttons : ['ok'],
    show: typeof show == 'boolean' ? show : false,
})