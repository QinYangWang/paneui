/** Sets the document language before the client hydrates. */
export const siteLocaleScript = `try{if(localStorage.getItem("site-locale")==="zh")document.documentElement.lang="zh-CN"}catch(e){}`
