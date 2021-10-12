export const environment = {
  production: true
};

//export const SERVER_URL = "http://34.68.98.35:2350"
export const SERVER_URL = "http://192.168.0.185:2350"
export let TOKEN = {
  access_token: "",
  refresh_token: ""
}
export let KEY = {
  key: "",
  keymobile: ""
}

export let IMAGE = {
  thumbs: [],
  imagefull: []
}

export let TIP = {
  tips: null
}

export let ROLE = {
  role: "",
  parent: "",
  company_name: ""
}

export let LANGUAGE = {
  locale: "pt"
}

export let BADGE = {
  new_ticket: 0,
  new_service: 0,
  new_solicitation:0,
  new_equipments:0
}
