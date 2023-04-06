export const emailRegex =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
export const phoneRegex = /^\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{2}[-.\s]?\d{2}$/

export const usernameRegex = /^@?\w+$/
// /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
// /^@?[A-Za-z0-9_]{1,15}$/
export const nameRegex = /^[A-Za-z]+\s[A-Za-z]+$/
export const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/

export const regexType = [
  { regex: emailRegex, type: 'Email' },
  { regex: phoneRegex, type: 'Phone' },
  { regex: usernameRegex, type: 'Nickname' },
  { regex: nameRegex, type: 'Name' },
  { regex: ipRegex, type: 'IP' }
]
