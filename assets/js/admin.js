//Elementos del DOM
const $listado = document.querySelector('#listado');
const $form_field_lat = document.querySelector('#form_field_lat');
const $form_field_lng = document.querySelector('#form_field_lng');
const $form_field_name = document.querySelector('#form_field_name');
const $form_field_description = document.querySelector('#form_field_description');
const $form_field_type = document.querySelector('#form_field_type');
const $form_field_id = document.querySelector('#form_field_id'); //Se agregó el campo ID como input hidden
const $form_main = document.querySelector('#form_main');
const $add_button = document.querySelector('.handleAdd');


//READ
const getEmbajadas = async (id = '') => {
    const result = await api.getEmbajadas();
    if (id == '') {  //Cuando la llama el document ready
        $listado.innerHTML = '';
        result.forEach(element => {
            $listado.innerHTML += dataRow(element)
        });

        //Agrego estos dos nuevo EventListeners apenas agrego los elementos nuevos al DOM
        const $btnsDelete = document.querySelectorAll('.handleDelete');
        $btnsDelete.forEach(element => {
            element.addEventListener('click', handleClickDelete)
        });
        const $btnsEdit = document.querySelectorAll('.handleEdit');
        $btnsEdit.forEach(element => {
            element.addEventListener('click', handleClickEdit)
        });

    } else { //Cuando la llamo con un id desde edit. Para hacer una busqueda x id
        const elementByID = result.find(el => id == el._id)
        return elementByID
    }
}

const dataRow = props => {
    const { _id, lat, lng, name, description, type } = props
    return `
        <div class="item">
            <div class="listado_content">
                <h2>${name}</h2>
            </div>
            <div class="btns_wrapper">
                <a href="#" data-id="${_id}" class="btn verde handleEdit">Editar</a>
                <a href="#" data-id="${_id}" class="btn rojo handleDelete">Eliminar</a>
            </div>
        </div>
    `
}

getEmbajadas(); //Llamo a la función cuando carga la página

//DELETE
const deleteEmbajada = async (id) => {
    const result = await api.deleteEmbajadas(id);
    console.log('Deleted', result)
    getEmbajadas();
}
const handleClickDelete = async () => {
    const id = event.target.dataset.id;
    deleteEmbajada(id);
}

//UPDATE
const updateEmbajada = async (data, id) => {
    const result = await api.updateEmbajadas(data, id);
    console.log('Updated', result)
    getEmbajadas();
}
const handleClickEdit = async () => {
    const id = event.target.dataset.id;
    const reg = await getEmbajadas(id);
    $form_main.classList.add("active");
    completeForm(reg)
}
const completeForm = (reg) => {
    const { _id, lat, lng, name, description, type } = reg;
    $form_field_id.value = _id;
    $form_field_lat.value = lat;
    $form_field_lng.value = lng;
    $form_field_name.value = name;
    $form_field_description.value = description;
    $form_field_type.value = type;
}

//CREATE
const createEmbajada = async (data) => {
    const result = await api.createEmbajada(data);
    console.log('Created', result)
    getEmbajadas();
}

const handleClickAdd = (event) => {
    event.preventDefault();
    $form_field_id.value = '';
    $form_main.reset();
    $form_main.classList.add("active");
    $form_field_lat.focus();
}

$add_button.addEventListener('click', handleClickAdd)

//FORM (Update o Create)
$form_main.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = $form_field_id.value
    const formData = {
        "lat": $form_field_lat.value,
        "lng": $form_field_lng.value,
        "name": $form_field_name.value,
        "description": $form_field_description.value,
        "type": $form_field_type.value
    }
    $form_main.classList.remove("active");
    if (id === '') {
        createEmbajada(formData)
    } else {
        updateEmbajada(formData, id);
    }
    //Reseteo el form
    $form_field_id.value = '';
    $form_main.reset();
})



// Dr. Emmett Brown: Marty! I need you to go back with me!
// Marty McFly: Where?
// Dr. Emmett Brown: Back to the Future!

//To be continued...