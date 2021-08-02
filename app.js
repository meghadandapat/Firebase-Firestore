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

//******GETTING DOCUMENTS USING GET METHOD******//
//get is an async method which returns a promise

//USE WHERE METHOD WHEN YOU NEED TO FILTER OUT QUERIES
//TAKES THREE PARAMETERS
//db.collection('cafes').where('city', '==', 'Paris').get()

//USE ORDERBY  Method TO ORDER data
//Chaining of several methods is also possible

// db.collection('cafes').get().then((snapshot) => {
//     // console.log(snapshot.docs)
//     snapshot.docs.forEach(doc => {
//         //data method will get the actual data for us
//         console.log(doc.data())
//         renderCafe(doc)
//     })
// }) 


//*******REAL TIME LISTENERS USING ONSNAPSHOT METHOD to make our app reactive, ie update without refresh*******//
db.collection('cafes').orderBy('city').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    console.log(changes)
    changes.forEach(change => {
        console.log(change.doc.data())
        if (change.type === 'added')
            renderCafe(change.doc)
        else if (change.type === 'removed') {
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
       
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


//********updating records using UPDATE METHOD*********//

//pass the id of document inside doc method 
/* db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
    name: 'mario world'
});

db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
    city: 'hong kong'
}); */

//******setting data using SET METHOD******// 
//This completely ovrrides the document hence name will have no value here
/* db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').set({
    city: 'hong kong'
}); */