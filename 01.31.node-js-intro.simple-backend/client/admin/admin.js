const form = document.querySelector("form");
const tBody = document.querySelector("tbody");
const productName = document.querySelector("#product-name");
const price = document.querySelector("#price");
const photo = document.querySelector("#photo");
const description = document.querySelector("#description");

const BASE_URL = `http://localhost:8080/products`;
let base64;
async function getAllData() {
  try {
    const response = await axios(`${BASE_URL}`);
    // console.log(response.data);
    drawTable(response.data);
  } catch (error) {
    console.log(error);
  }
}

getAllData();

function drawTable(data) {
  tBody.innerHTML = "";

  data.forEach((item) => {
    const trElem = document.createElement("tr");
    trElem.innerHTML = `
            <td>${item.id}</td>
            <td><img src="${item.image}"/></td>
            <td>${item.title}</td>
            <td>${item.description.slice(0, 100)}...</td>
            <td>${item.price}</td>
            <td>
                <button onclick=deleteProduct("${item.id}",this)>DELETE</button>
                <button>EDIT</button>
            </td>
    `;
    tBody.append(trElem);
  });
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  let product = {
    title: productName.value,
    price: price.value,
    description: description.value,
    image: base64,
  };

  if (productName.value && price.value && description.value && photo.value) {
    await axios.post(`${BASE_URL}`, product);
    getAllData();
  } else {
    window.alert("fill all fields!");
  }
});

async function deleteProduct(id, btn) {
  try {
    if (window.confirm("Are u sure to delete??")) {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      if (response.status === 200) {
        btn.closest("tr").remove();
      }
    }
  } catch (error) {
    throw new Error({ message: error.message });
  }
}

photo.addEventListener("change", function (e) {
  uploadImage(e);
});

const uploadImage = async (event) => {
  try {
    const file = event.target.files[0];
    base64 = await convertBase64(file);
    console.log(base64);
  } catch (error) {
    console.log(error);
  }
};

const convertBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};