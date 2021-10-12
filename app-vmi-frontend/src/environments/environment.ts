// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
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
  new_ticket: 1,
  new_service: 1,
  new_solicitation:1,
  new_equipments:1
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
