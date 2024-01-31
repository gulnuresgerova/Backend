const BASE_URL = `http://localhost:8080/product`;
let productsCard = document.querySelector(".products-cards");
async function getAllData() {
  try {
    const response = await axios(`${BASE_URL}s`);
    drawCards(response.data);
  } catch (error) {
    console.log(error);
  }
}

getAllData();

function drawCards(data) {
  productsCard.innerHTML = "";
  data.forEach((item) => {
    productsCard.innerHTML += `<div class="card" style="width: 18rem">
            <img src="${item.image}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">
              ${item.description}
              </p>
              <p class="card-text">
              Price: $${item.price}
              </p>
              <a href="#" class="btn btn-primary">Details</a>
            </div>
          </div>`;
  });
}