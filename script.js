let categoryData = null;
let mansData = null;
let womensData = null;
let kidsData = null;
let container = document.getElementById("item-container");
let menBtn = document.querySelector(".men");
let womenBtn = document.querySelector(".women");
let kidBtn = document.querySelector(".kids");

function addDataToHTML(item) {
  html = "";
  item?.forEach((element, index) => {
    let perOff = Math.round(
      ((element.compare_at_price - element.price) / element.compare_at_price) *
        100
    );
    let title = element?.title;
    if (title.length >= 10) {
      title = title.slice(0, 10) + "...";
    }
    html += `
                <div class="card">
                    <img src="${element?.image}" alt="Dress Image" />
                    <div class="card-content">
                        <div class="about">
                            <div class="name">${title}</div>
                            <div class="vendor">${element?.vendor}</div>
                        </div>
                        <div class="pricing-details">
                            <div class="price">${element?.price}</div>
                            <div class="prev-price">${element?.compare_at_price}</div>
                            <div class="percent-off">${perOff}% Off</div>
                        </div>
                        <button class="cart">
                            Add to Cart
                        </button>
                    </div>
                </div>
    `;
  });
  container.innerHTML = html;
}

function getCategoryWiseData(category_name) {
  category_name = category_name.toLowerCase();
  let [data] = categoryData.filter(
    (data) => data.category_name.toLowerCase() === category_name
  );
  return data.category_products;
}

fetch(
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
)
  .then((response) => response.json())
  .then((data) => {
    categoryData = data.categories;
    mansData = getCategoryWiseData("Men");
    womensData = getCategoryWiseData("Women");
    kidsData = getCategoryWiseData("Kids");
    addDataToHTML(mansData);
  })
  .catch((error) => console.error("Error:", error));

menBtn.addEventListener("click", () => {
  addDataToHTML(mansData);
  menBtn.classList.add("btn-enable");
  womenBtn.classList.remove("btn-enable");
  kidBtn.classList.remove("btn-enable");
});
womenBtn.addEventListener("click", () => {
  addDataToHTML(womensData);
  menBtn.classList.remove("btn-enable");
  womenBtn.classList.add("btn-enable");
  kidBtn.classList.remove("btn-enable");
});
kidBtn.addEventListener("click", () => {
  addDataToHTML(kidsData);
  menBtn.classList.remove("btn-enable");
  womenBtn.classList.remove("btn-enable");
  kidBtn.classList.add("btn-enable");
});
