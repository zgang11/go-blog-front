const returnFormData = (data) => {
  const formData = new FormData()
  for(let [k,v] of Object.entries(data)) {
    formData.append(k, v)
  }
  return formData
}

export { returnFormData }