const cafeList = document.querySelector('#cafe-list')
const form = document.querySelector('#add-cafe-form')

//create element and render cafe
function renderCafe(doc) {
    let li = document.createElement('li')
    let name = document.createElement('span')
    let city = document.createElement('span')
    let cross = document.createElement('div')

    li.setAttribute('data-id', doc.id)
    name.textContent = doc.data().name;
    city.textContent = doc.data().city
    cross.textContent = 'x';
    li.appendChild(name)
    li.appendChild(city)
    li.appendChild(cross)
    cafeList.appendChild(li)

    //*****DELETING DOCUMENTS USING DELETE METHOD*****//
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id')
        //find the document with the id and then delete
        db.collection('cafes').doc(id).delete()
    })
}

//******GETTING DOCUMENTS******//
//get is an async method which returns a promise
db.collection('cafes').get().then((snapshot) => {
    // console.log(snapshot.docs)
    snapshot.docs.forEach(doc => {
        //data method will get the actual data for us
        console.log(doc.data())
        renderCafe(doc)
    })
})

//*******SAVING DATA USING ADD METHOD******//
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value

    });
    //clearing out input fields after submit
    form.name.value = '';
    form.city.value = '';

})
