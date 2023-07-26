
console.log(db)
async function teste(db){
// Add a new document with a generated id.
const res = await db.collection('cities').add({
    name: 'Tokyo',
    country: 'Japan'
  });
  
  console.log('Added document with ID: ', res.id);
}

teste(db)

