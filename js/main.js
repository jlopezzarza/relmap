// create the vis elements
const nodes = new vis.DataSet([])
const edges = new vis.DataSet([])

// create a network
const network = new vis.Network(
  document.getElementById("mynetwork"),
  { nodes: nodes, edges: edges },
  {})

const charNameInput = document.getElementById("charName")
const addCharButton = document.getElementById("addCharButton")
const relLabelInput = document.getElementById("relLabel")
const relCharButton = document.getElementById("relCharButton")
const relFromSelect = document.getElementById("addRelFrom")
const relToSelect = document.getElementById("addRelTo")
const charRemoveSelect = document.getElementById("charRemoveSelect")
const relSelect = document.getElementById("removeRelSelect")

const hideItem = (id) => { document.getElementById(id).classList.add("is-hidden") }
const showItem = (id) => { document.getElementById(id).classList.remove("is-hidden") }

const checkCharInput = () => {
  if (charNameInput.value != "") {
    addCharButton.disabled = false
  }
  hideItem("nameTakenWarn")
  nodes.forEach(node => {
    if (node.label == charNameInput.value) {
      showItem("nameTakenWarn")
      addCharButton.disabled = true
    }
  })
}

const checkRelInput = () => {
  if (relLabelInput.value != "" && relFromSelect.value != "" && relToSelect.value != "") {
    relCharButton.disabled = false
  }
}

const mapColors = {
  Vampire: { border: "#08088A", background: "#819FF7" },
  Human: { border: "#8A2908", background: "#F5D0A9" },
}

const addCharacter = () => {
  let type = document.getElementById("charType").value

  nodes.add({
    id: nodes.length + 1,
    label: charNameInput.value,
    color: mapColors[type]
  })

  charNameInput.value = ""
  addCharButton.disabled = true
  updateSelectOptions()
}

const removeCharacter = () => {
  nodes.remove(Number(charRemoveSelect.value))
  updateSelectOptions()
}

const removeRelation = () => {
  edges.remove(Number(relSelect.value))
  updateRelSelectOptions()
}

// this function reads the nodes and generates the options to fill the selects
const updateSelectOptions = () => {
  let selects = [relFromSelect, relToSelect, charRemoveSelect]
  selects.forEach(select => cleanUpSelects(select))
  nodes.forEach(node => selects.forEach(select => addOption(node, select)))
}

const updateRelSelectOptions = () => {
  cleanUpSelects(relSelect)
  edges.forEach(rel => {
      let optionElement = document.createElement("option")
      optionElement.value = rel.id
      let text = `${nodes.get(Number(rel.from)).label} - ${rel.label} - ${nodes.get(Number(rel.to)).label}`
      optionElement.textContent = text
      relSelect.appendChild(optionElement)
  })
}

// appends a new edge reading the items from the form submitted
const addRelation = () => {
  edges.add({
    id: edges.length + 1,
    from: relFromSelect.value,
    to: relToSelect.value,
    label: relLabelInput.value
  })

  relLabelInput.value = ""
  relCharButton.disabled = true
  updateRelSelectOptions()
}

// clean the previous selections
const cleanUpSelects = (select) => {
  while (select.firstChild) {
    select.removeChild(select.firstChild)
  }
}

// append select options
const addOption = (item, select) => {
  let optionElement = document.createElement("option")
  optionElement.value = item.id
  optionElement.textContent = item.label
  select.appendChild(optionElement)
}

// append blank select option
const addBlankOption = (select, label) => {
  let optionElement = document.createElement("option")
  optionElement.disabled = true
  optionElement.selected = true
  optionElement.textContent = label
  select.appendChild(optionElement)
}

const toogleMenu = () => {
  document.getElementById("hide-menu-toggler").classList.toggle("is-hidden") 
  document.getElementById("menu").classList.toggle("is-hidden")
  document.getElementById("show-menu-toggler").classList.toggle("is-hidden") 
}