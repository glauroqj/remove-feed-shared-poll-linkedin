/*global chrome*/

(() => {
  const throttle = (callback, limit, delay) => {
    let count = 0
    return (...args) => {
      if (count === limit) {
        count = 0
        setTimeout(() => callback(...args), delay)
      }
      count++
    }
  }

  document.addEventListener('scroll', throttle(
    () => {
      let counter = 0
      console.log('< searching polls to delete... >')
      const feedPolls = () => [...document.querySelectorAll('.feed-shared-poll')]

      const deletePolls = async () => {
        const queue = feedPolls()
        // chrome.action.setBadgeText({text: `${counter}`})

        queue.length > 0 && queue.forEach((element) => {
          console.log('< removed poll >')
          element &&  element.offsetParent.remove()
          counter++
        })
      }
      deletePolls()
    },
    50,
    5
  ));

  console.log('< linkeclean is ready > ')
})()