console.log("bag viewer ready")

const WIDTH = 1024
const HEIGHT = 768

/** @type {{ id: number, label: string, x: number, y: number, width: number, height: number }[]} */
let items = []

const svg = d3.select("svg#full_flatlay_svg")
  .attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`)
  .attr("preserveAspectRatio", "xMidYMid meet")
  .style("touch-action", "none")
  .style("user-select", "none")

svg.append("image")
  .attr("href", "img/full_flatlay.jpg")
  .attr("width", WIDTH)
  .attr("height", HEIGHT)
  .attr("x", 0)
  .attr("y", 0)
  .attr("pointer-events", "none")

const layer = svg.append("g").attr("class", "boxes")

const IMG_DIR = "img"
const FALLBACK_IMG = `${IMG_DIR}/small_extras.jpg`

const popover = d3.select("body")
  .append("div")
  .attr("class", "bag-popover")
  .attr("hidden", true)
  .attr("role", "tooltip")

const lightbox = d3.select("body")
  .append("div")
  .attr("class", "bag-lightbox")
  .attr("hidden", true)
  .attr("role", "dialog")
  .attr("aria-modal", "true")

lightbox.append("button")
  .attr("class", "bag-lightbox-close")
  .attr("type", "button")
  .attr("aria-label", "Close")
  .text("×")

const lightboxFigure = lightbox.append("figure").attr("class", "bag-lightbox-figure")
const lightboxImg = lightboxFigure.append("img").attr("alt", "")
const lightboxCaption = lightboxFigure.append("figcaption")

const DISPLAY_NAMES = {
  airtag: "AirTag",
  airpods: "AirPods",
  usb_stick: "USB stick",
  earbuds_dongle: "Earbuds dongle",
  infinity_tool: "Infinity tool",
  acme_bag: "ACME bag",
  pocket_knife: "Pocket knife",
  hard_drive: "Hard drive",
  mosquito_repellent: "Mosquito repellent",
  tiger_balm: "Tiger Balm",
  lip_balm: "Lip balm",
  magmo: "Magmo",
  nano_bag: "Nano bag",
  sharge_disk: "Sharge disk",
}

function displayName(label) {
  if (DISPLAY_NAMES[label]) return DISPLAY_NAMES[label]
  return label
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function hidePopover() {
  popover.attr("hidden", true)
  layer.selectAll("g.box").classed("is-hot", false)
}

function positionPopover(event) {
  const pad = 14
  const node = popover.node()
  const rect = node.getBoundingClientRect()
  let left = event.clientX + pad
  let top = event.clientY + pad

  if (left + rect.width > window.innerWidth - 8) {
    left = event.clientX - rect.width - pad
  }
  if (top + rect.height > window.innerHeight - 8) {
    top = event.clientY - rect.height - pad
  }

  popover
    .style("left", `${Math.max(8, left)}px`)
    .style("top", `${Math.max(8, top)}px`)
}

function showPopover(datum, event) {
  layer.selectAll("g.box").classed("is-hot", (d) => d.id === datum.id)
  popover
    .attr("hidden", null)
    .html(`<strong>${displayName(datum.label)}</strong>`)
  positionPopover(event)
}

function movePopover(event) {
  if (popover.attr("hidden") != null) return
  positionPopover(event)
}

function itemImageSrc(label) {
  return `${IMG_DIR}/${label}.jpg`
}

function closeLightbox() {
  lightbox.attr("hidden", true)
  document.body.classList.remove("bag-lightbox-open")
}

function openLightbox(datum) {
  hidePopover()
  const name = displayName(datum.label)
  lightboxCaption.text(name)
  const img = lightboxImg.node()
  img.dataset.fallback = ""
  lightboxImg
    .attr("alt", name)
    .attr("src", itemImageSrc(datum.label))
  lightbox.attr("hidden", null)
  document.body.classList.add("bag-lightbox-open")
}

lightboxImg.on("error", function () {
  const node = this
  if (node.dataset.fallback === "1") return
  node.dataset.fallback = "1"
  node.src = FALLBACK_IMG
})

lightbox.on("click", function (event) {
  if (event.target === lightbox.node()) closeLightbox()
})

lightbox.select(".bag-lightbox-close").on("click", closeLightbox)

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.attr("hidden") == null) {
    closeLightbox()
  }
})

function renderBoxes() {
  const sel = layer.selectAll("g.box").data(items, (d) => d.id)
  sel.exit().remove()

  const enter = sel.enter().append("g")
    .attr("class", "box")
    .style("cursor", "pointer")

  enter.append("rect")
    .attr("class", "box-hit")
    .attr("fill", "transparent")
    .attr("stroke", "transparent")
    .attr("stroke-width", 2)

  enter.append("rect")
    .attr("class", "box-glow")
    .attr("fill", "rgba(255, 248, 220, 0.0)")
    .attr("stroke", "rgba(255, 236, 160, 0)")
    .attr("stroke-width", 2)
    .attr("pointer-events", "none")
    .attr("rx", 4)
    .attr("ry", 4)

  // D3 v6+: handlers receive (event, d). d3.event was removed.
  enter
    .on("pointerenter", function (event, d) {
      showPopover(d, event)
    })
    .on("pointermove", function (event) {
      movePopover(event)
    })
    .on("pointerleave", hidePopover)
    .on("click", function (event, d) {
      event.preventDefault()
      event.stopPropagation()
      openLightbox(d)
    })

  const merged = enter.merge(sel)

  merged.select("rect.box-hit")
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y)
    .attr("width", (d) => d.width)
    .attr("height", (d) => d.height)

  merged.select("rect.box-glow")
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y)
    .attr("width", (d) => d.width)
    .attr("height", (d) => d.height)
}

async function loadItems() {
  const res = await fetch("items.json")
  if (!res.ok) throw new Error(`Failed to load items.json (${res.status})`)
  const data = await res.json()
  const list = Array.isArray(data) ? data[data.length - 1].items : data.items
  items = list.map((item, i) => ({ id: i + 1, ...item }))
  renderBoxes()
  console.log(`Loaded ${items.length} bag items - hover to identify, click for photo`)
}

loadItems().catch((err) => {
  console.error(err)
  d3.select("body").append("p")
    .attr("class", "bag-error")
    .text("Could not load bag items.")
})
