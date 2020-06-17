const directive = {
  inserted(el, binding) {

    let $el = el
    const realElemWidth = $el.clientWidth
    const realText = $el.textContent
    const arrText = realText.split(" ").filter(item => item !== "")

    const lineCount = binding.value.line
    let spaceWidth = 0
    const $clone = $el.cloneNode(true)

    $el.parentElement.appendChild($clone)

    $clone.style.cssText = "display: inline-block; width: initial"

    const spaces = ["Vestibulum facilisis", "Vestibulumfacilisis"].map(text => {
      $clone.textContent = text
      return $clone.getClientRects()[0].width
    })

    spaceWidth = spaces[0] - spaces[1]


    const result = arrText.map(text => {
      $clone.textContent = text
      return {
        text,
        rects: $clone.getClientRects()[0]
      }
    })


    const arrInfo = []
    let rank = 0
    result.reduce((sum, item, index) => {

      let total = sum + item.rects.width + spaceWidth

      if (total > realElemWidth) {
        arrInfo.push({
          textCount: rank
        })
        total = item.rects.width + spaceWidth
        rank = 0
      }

      rank++
      return total
    }, 0)


    const textCount = arrInfo.filter((item, index) => lineCount > index).reduce((sum, item) => sum + item.textCount, 0)
    const newText = arrText.filter((item, index) => index < textCount).join(" ")


    $el.textContent = newText
    $clone.parentNode.removeChild($clone)
    // $clone.remove()


    // el.onscroll = (event) => {
    //   const status = getStatusChangesOfScroll(event.target, options)
    //   if (status !== "stable") {
    //     status === "enter" ? binding.value.onEnter() : binding.value.onLeave()
    //   }
    // }
  }
}

export default directive