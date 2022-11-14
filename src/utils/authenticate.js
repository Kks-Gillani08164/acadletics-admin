const email = "kksgillani1@gmail.com"
const password = "1234"

export function authenticate(givenEmail, givenPassword) {
  if (givenEmail === email && givenPassword === password) return true
  else return false
}
