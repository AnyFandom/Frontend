class Storage {
  constructor() {}

  get(key, default_value) {
    let result = localStorage.getItem(key)
    if (result) {
      try {
        return JSON.parse(result)
      } catch (e) {
        return result
      }
    } else {
      return default_value
    }
  }
  set(key, value) {
    return localStorage.setItem(key, JSON.stringify(value))
  }
  clear() {
    return localStorage.calear()
  }
}
export default new Storage();
