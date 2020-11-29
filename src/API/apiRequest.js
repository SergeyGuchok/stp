import { loadFromLocalStorage } from "../utils/localStorage";
import { TOKEN_KEY } from "../constants";

// GET
export function apiGet (uri) {
  return getResponse('GET', uri)
}

// POST
export function apiPost (uri, data) {
  return getResponse('POST', uri, data)
}

// PATCH
export function apiPatch (uri, data) {
  return getResponse('PATCH', uri, data)
}

// PUT
export function apiPut (uri, data) {
  return getResponse('PUT', uri, data)
}

// DELETE
export function apiDelete (uri, data) {
  return getResponse('DELETE', uri, data)
}

// FORM POST
export function apiFormPost (uri, formData, onSuccess, onError, onProgress) {
  const xhr = new XMLHttpRequest()
  if (onProgress && xhr.upload) {
    xhr.upload.onprogress = (e) => {
      e.percent = e.total > 0 ? e.loaded / e.total * 100 : 0
      onProgress(e)
    }
  }

  xhr.onload = () => {
    if (xhr.status === 200) {
      const json = jsonTryParse(xhr.responseText)
      onSuccess && onSuccess(json)
    } else {
      onError && onError()
    }
  }

  xhr.onerror = () => {
    onError && onError()
  }

  xhr.open('POST', uri, true)
  xhr.send(formData)

  return () => {
    xhr.abort()
  }
}

// Helpers
async function getResponse (type, uri, data) {
  const options = {
    method: type,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  const token = loadFromLocalStorage(TOKEN_KEY)

  if (token) {
    options.headers.Authorization = `Bearer ${token}`
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  const request = await fetch(uri, options)
  const response = await checkHttpStatus(request)
  return parseBody(response)
}

async function checkHttpStatus (response) {
  if (response.ok) {
    return response
  }
  // if (response.status === 401) {
  //   window.location.href = '/login'
  // }
  return response
}

function parseBody (response) {
  const isJson = response && response.headers.get('content-type').indexOf('application/json') !== -1
  const isStream = response && response.headers.get('content-type').indexOf('application/octet-stream') !== -1
  if (isJson) {
    return response.json()
  } else if (isStream) {
    return response.blob()
  } else {
    return null
  }
}

const jsonTryParse = (jsonStr) => {
  try {
    return JSON.parse(jsonStr)
  } catch (e) {
    return null
  }
}
