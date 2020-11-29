const saveToLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

const loadFromLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))

const removeFromLocalStorage = (key) => window.localStorage.removeItem(key)

export {
  loadFromLocalStorage,
  saveToLocalStorage,
  removeFromLocalStorage
}
