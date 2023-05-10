export const MessageState = (messageType, titleText, bodyText, buttons) => ({
    messageType: messageType ? messageType : 'danger',
    titleText: titleText ? titleText : '',
    bodyText: bodyText ? bodyText : '',
    buttons: buttons ? buttons : ['ok'],
    show: false,
})