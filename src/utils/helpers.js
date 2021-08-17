// Libraries
import * as typo from "src/scss/modules/Typo.module.scss"


export class disableScroll {
  static on() {
    document.body.style.overflow = "hidden"
    document.body.style.top = `-${window.scrollY}px`
  }

  static off() {
    document.body.style.overflow = "auto"
    const scrollY = document.body.style.top
    window.scrollTo(0, parseInt(scrollY || "0") * -1)
  }
}

// export const scrollTo = scrollerConfig => {
//     const fixedConfig = {
//         duration: 1500,
//         smooth: true
//     }

//     scroller.scrollTo(scrollerConfig.element, { ...fixedConfig, offset: scrollerConfig.offset || 0 })
// }

export const saveToLocalStorage = data => {
  // const now = new Date()
  // const ttl = 259200000;
  // data.expiry = now.getTime() + ttl;
  localStorage.setItem("loginData", JSON.stringify(data))
  return true
}

export const getFromLocalStorage = () => {
  const isLogin = localStorage.getItem("loginData")
  // if the item doesn't exist, return null
  if (!isLogin) {
    return null
  }
  const item = JSON.parse(isLogin)
  const now = new Date()
  // compare the expiry time of the item with the current time
  // if (now.getTime() > item.expiry) {
  // 	// If the item is expired, delete the item from storage
  // 	// and return null
  // 	localStorage.removeItem("loginData")
  // 	return null
  // }
  return item
}

export const fetchAgenda = async nip => {
  try {
    const response = await fetch(
      `https://inspigo-b2b-api.herokuapp.com/mlc/users/${nip}/schedules`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    if (response.status === 200) {
      const event = response.json()
      return event
    } else {
      return undefined
    }
  } catch (error) {
    return undefined
  }
}

export const getEventData = async () => {
  const user = getFromLocalStorage()
  if (!user) {
      return null
  }
  const events = await fetchAgenda(user.nip)
  if (events) {
    switch (events.type) {
        case "user":
          return {
            type: "list",
            data: [{title : "", list_content : events.schedules.map(val => {
                return {
                    src : val.banner,
                    event : {
                        title : val.title,
                        content : val.description
                    },
                    cta : val.actions
                }
            })}]
           
          }
        default:
          return {
            type: "agenda",
            data: events.schedules
          }
      }
  }else{
      return {
          type : "agenda",
          data : []
      }
  }

  
}

export const formattingTime = time => {
  let seconds = parseInt(time)
  let minutes = Math.floor(seconds / 60)

  seconds = seconds % 60

  if (minutes < 10) {
    minutes = "0" + minutes
  }

  if (seconds < 10) {
    seconds = "0" + seconds
  }

  return `${minutes}:${seconds}`
}

export const TITLE_STYLE = title => {
  let title_style = null
  switch (title.style) {
    case "neon":
      return (title_style = typo.neon)
    case "blue":
      return (title_style = typo.blue)
    case "white":
      return (title_style = typo.white)
    default:
      return title_style
  }
}

export const fetchUser = async data => {
  try {
    const response = await fetch(
      "https://inspigo-b2b-api.herokuapp.com/mlc/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
    console.log(response, response.status)
    if (response.status === 200) {
      const user = await response.json()
      return user
    } else {
      return undefined
    }
  } catch (error) {
    return undefined
  }
}
