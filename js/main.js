// myAPI = https://fakestoreapi.com/products
let AllProducts = [];
let categoryProducts = [];
let myProduct = [];

setPage("home", document.getElementsByClassName("page-ele active")[0]);
// setPage("product", 5);
async function getProducts(page, productID) {
  let x = await fetch("https://fakestoreapi.com/products").then((res) =>
    res.json()
  );
  AllProducts = [...x];

  // set page contant
  if (page == "home") {
    // Home Page
    pageContant = `
            <div id="carouselExampleControls" class="carousel slide rounded my-4" data-bs-ride="carousel">
        <div class="carousel-inner rounded-4">
          <div class="carousel-item active">
            <img src="images/1.png" onclick="setPage('electronics',this)" class="d-block w-100" " alt="...">
          </div>
          <div class="carousel-item">
            <img src="images/4.png" onclick="setPage('jewelery',this)" class="d-block w-100" " alt="...">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
          data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <div class="container">
        <div id="newCards" class="newCards">
          <div class="sp-title">
            <h3>NEW PRODUCTS </h3>
          </div>
          <div id="newCards-box" class="newCards-box row">
          </div>
        </div>

        <div class="bestCards row mt-5">
          <div class="sp-title">
            <h3>Best Selling </h3>
          </div>
          <div id="bestCards-box" class="newCards-box row">

          </div>
        </div>
      </div>
    `;
    document.getElementById("page-container").innerHTML = pageContant;
    showNewProducts();
    showBestProducts();
  } else if (page == "products") {
    // products Page
    pageContant = `
      <div class="container">
        <div class="allCards row mt-5">
          <div class="sp-title">
            <h3>Our Products</h3>
          </div>
          <div id="allCards-box" class="newCards-box row">
        
          </div>
        </div>
      </div>
    `;
    document.getElementById("page-container").innerHTML = pageContant;
    showAllProducts();
  } else if (
    page == "electronics" ||
    page == "jewelery" ||
    page == "men's clothing" ||
    page == "women's clothing"
  ) {
    let y = await fetch(
      `https://fakestoreapi.com/products/category/${page}`
    ).then((res2) => res2.json());
    categoryProducts = [...y];
    // console.log(categoryProducts);
    // electronics Page
    pageContant = `
        <div class="container">
          <div class="categoryCards row mt-5">
            <div class="sp-title">
          <h3>Our ${page.toUpperCase()} Collection</h3>
            </div>
            <div id="categoryCards-box" class="categoryCards-box row">
          
            </div>
          </div>
        </div>
      `;
    document.getElementById("page-container").innerHTML = pageContant;
    showCategoryProducts();
  } else if (page == "product") {
    let y = await fetch(
      `https://fakestoreapi.com/products/${productID}`
    ).then((res2) => res2.json());
    myProduct = y;
    // console.log(myProduct);
    let c = await fetch(
      `https://fakestoreapi.com/products/category/${myProduct.category}`
    ).then((res2) => res2.json());
    categoryProducts = [...c];

    // electronics Page
    prodInfo = `
        <div id="myProduct-box" class="myProduct pt-2 mt-5">

        </div>
        <div class="container">
          <div class="categoryCards row mt-5">
            <div class="sp-title">
          <h3> Related Products </h3>
            </div>
            <div id="categoryCards-box" class="categoryCards-box row">
          
            </div>
          </div>
        </div>
      `;
    document.getElementById("page-container").innerHTML = prodInfo;
    showCategoryProducts();
    showProduct();
  }
  // console.log(AllProducts);
}

function showAllProducts() {
  var all = ``;
  for (var i = 0; i < AllProducts.length; i++) {
    all += `
          <div class="my-card p-3 col-12 col-sm-6 col-lg-4 col-xl-3">
            <div class=" p-3 rounded-3 d-flex flex-column justify-content-center align-items-center "
              style="background: #fff; border: 1px solid #cbd4d7;  ">
          <div class="img-box d-flex flex-column justify-content-center align-items-center " style="height:300px;" >
                <img class="img-fluid pb-3" width="200px" style="max-height:300px;"  src=${
                  AllProducts[i].image
                } alt="">
              </div>
              <div class="product-name">
            <h3 style="color: #1190c2;">${AllProducts[i].title}</h3>
            <p>${AllProducts[i].description}
                </p>
              </div>
              <div class="price d-flex justify-content-between w-100">
        <div class="pr">$${
          AllProducts[i].price
        } <del class="text-black-50 ">$${(AllProducts[i].price + 40).toFixed(
      2
    )}</del> </div>
                <div class="rate d-flex">
                  <li class="list-inline-item"><i class="fa fa-star" style="color: #ffc000;"></i></li>
              <div class="rate-num">${AllProducts[i].rating.rate}</div>
                </div>
              </div>
              <a href="#" onclick="setPage('product', ${
                AllProducts[i].id
              })">Details</a>
            </div>
          </div>
    `;
  }
  document.getElementById("allCards-box").innerHTML = all;
}

function showNewProducts() {
  let newProducts = [];
  let numItems = 4;
  for (let i = 0; i < numItems; i++) {
    let randomIndex = Math.floor(Math.random() * AllProducts.length);
    newProducts.push(AllProducts[randomIndex]);
  }
  // console.log(newProducts);
  var newP = ``;
  for (var i = 0; i < newProducts.length; i++) {
    newP += `
          <div class="my-card p-3 col-12 col-sm-6 col-lg-4 col-xl-3">
            <div class=" p-3 rounded-3 d-flex flex-column justify-content-center align-items-center "
              style="background: #fff; border: 1px solid #cbd4d7;  ">
          <div class="img-box d-flex flex-column justify-content-center align-items-center " style="height:300px;" >
                <img class="img-fluid pb-3" width="200px" style="max-height:300px;"  src=${
                  newProducts[i].image
                } alt="">
              </div>
              <div class="product-name">
            <h3 style="color: #1190c2;">${newProducts[i].title}</h3>
            <p>${newProducts[i].description}
                </p>
              </div>
              <div class="price d-flex justify-content-between w-100">
        <div class="pr">$${newProducts[i].price} <del class="text-black-50 ">$${
      (newProducts[i].price + 40).toFixed(2)
      // take four digets from a dicimal numper
    }</del> </div>
                <div class="rate d-flex">
                  <li class="list-inline-item"><i class="fa fa-star" style="color: #ffc000;"></i></li>
              <div class="rate-num">${newProducts[i].rating.rate}</div>
                </div>
              </div>
              <a href="#" onclick="setPage('product', ${
                newProducts[i].id
              })">Details</a>
            </div>
          </div>
    `;
  }
  document.getElementById("newCards-box").innerHTML = newP;
}

function showBestProducts() {
  let bestProducts = [];
  let numItems = 4;
  for (let i = 0; i < numItems; i++) {
    let randomIndex = Math.floor(Math.random() * AllProducts.length);
    bestProducts.push(AllProducts[randomIndex]);
  }
  // console.log(bestProducts);
  var bestP = ``;
  for (var i = 0; i < bestProducts.length; i++) {
    bestP += `
          <div class="my-card p-3 col-12 col-sm-6 col-lg-4 col-xl-3">
            <div class=" p-3 rounded-3 d-flex flex-column justify-content-center align-items-center "
              style="background: #fff; border: 1px solid #cbd4d7;  ">
          <div class="img-box d-flex flex-column justify-content-center align-items-center " style="height:300px;" >
                <img class="img-fluid pb-3" width="200px" style="max-height:300px;"  src=${
                  bestProducts[i].image
                } alt="">
              </div>
              <div class="product-name">
            <h3 style="color: #1190c2;">${bestProducts[i].title}</h3>
            <p>${bestProducts[i].description}
                </p>
              </div>
              <div class="price d-flex justify-content-between w-100">
        <div class="pr">$${
          bestProducts[i].price
        } <del class="text-black-50 ">$${
      (bestProducts[i].price + 40).toFixed(2)
      // take four digets from a dicimal numper
    }</del> </div>
                <div class="rate d-flex">
                  <li class="list-inline-item"><i class="fa fa-star" style="color: #ffc000;"></i></li>
              <div class="rate-num">${bestProducts[i].rating.rate}</div>
                </div>
              </div>
              <a href="#" onclick="setPage('product', ${
                bestProducts[i].id
              })">Details</a>
            </div>
          </div>
    `;
  }
  document.getElementById("bestCards-box").innerHTML = bestP;
}

function showCategoryProducts() {
  var category = ``;
  for (var i = 0; i < categoryProducts.length; i++) {
    category += `
          <div class="my-card p-3 col-12 col-sm-6 col-lg-4 col-xl-3">
            <div class=" p-3 rounded-3 d-flex flex-column justify-content-center align-items-center "
              style="background: #fff; border: 1px solid #cbd4d7;  ">
          <div class="img-box d-flex flex-column justify-content-center align-items-center " style="height:300px;" >
                <img class="img-fluid pb-3" width="200px" style="max-height:300px;"  src=${
                  categoryProducts[i].image
                } alt="">
              </div>
              <div class="product-name">
            <h3 style="color: #1190c2;">${categoryProducts[i].title}</h3>
            <p>${categoryProducts[i].description}
                </p>
              </div>
              <div class="price d-flex justify-content-between w-100">
        <div class="pr">$${
          categoryProducts[i].price
        } <del class="text-black-50 ">$${(
      categoryProducts[i].price + 40
    ).toFixed(2)}</del> </div>
                <div class="rate d-flex">
                  <li class="list-inline-item"><i class="fa fa-star" style="color: #ffc000;"></i></li>
              <div class="rate-num">${categoryProducts[i].rating.rate}</div>
                </div>
              </div>
              <a href="#" onclick="setPage('product', ${
                categoryProducts[i].id
              })">Details</a>
            </div>
          </div>
    `;
  }
  document.getElementById("categoryCards-box").innerHTML = category;
}

function showProduct() {
  var bigProduct = ``;
  bigProduct += `
          <div class="row justify-content-center">
            <div class="py-3 prod-img col-12 col-md-4 col-lg-4 d-flex justify-content-center align-items-center">
              <img class="img-fluid w-100 " style="max-width: 300px;max-height: 350px;" src=${
                myProduct.image
              } alt="">
            </div>
            <div class="py-3 prod-img col-12 col-sm-6 col-md-4 col-lg-4 d-flex flex-column justify-content-evenly">
              <h2 style="color:var(--main-color);font-weight: bold;">${
                myProduct.title
              }</h2>
          <h5 class="text-black-50 product-desc">${myProduct.description}</h5>
              <p class="text-black-50 pt-2"><span class="text-black fw-bold">Category: </span><a id="cate-link" href="#" class="text-warning "
                  >${
    myProduct.category
  }</a></p>
            </div>
            <div class="py-3 prod-price  col-12 col-sm-6 col-md-4 col-lg-4 d-flex align-items-center" >
              <div class="w-100 p-3 rounded-3 d-flex flex-column justify-content-center"
                style="background: #fff; border: 2px solid var(--main-color);  ">
                <div class="price d-flex flex-column justify-content-between align-items-center w-100 ">
                  <h4 class="fw-bold">Add To Cart</h4>
                  <h4 class="fw-bold">$${myProduct.price}</h4>
                  <h5 class="text-danger "><del class="text-black-50 ">$${(
                    myProduct.price + 40
                  ).toFixed(2)}</del> ( $40 off )</h5>
                </div>
                <a class="product-btn my-2" href="#">Add to cart</a>
                <div class=" d-flex justify-content-between align-items-center w-100">
                  <div class="fw-bold" style="color: var(--main-color);">
                    <i class="fa fa-check"></i> In Stoke
                  </div>
                  <div class="rate d-flex my-2">
                    <li class="list-inline-item">
                      <i class="fa fa-star" style="color: #ffc000;"></i>
                    </li>
                    <div class="rate-num">${myProduct.rating.rate}</div>
                  </div>
                </div>
                <div class="delvery text-black-50 text-start ">
                  <p>Number of sales :<span class="text-black"> ${
                    myProduct.rating.count
                  }</span></p>
                  <p>Delivery - next day</p>
                </div>
              </div>
            </div>
          </div>
    `;
  document.getElementById("myProduct-box").innerHTML = bigProduct;
  document.getElementById("cate-link").onclick = () =>
    setPage(myProduct.category, 1);
}

function setPage(page, currLink) {
  getProducts(page, currLink);

  if (isNaN(currLink)) {
    var current = document.getElementsByClassName("page-ele active");
    current[0].className = current[0].className.replace("active", "");
    currLink.className += " active";
  }
}
