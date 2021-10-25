/****** Main Variables ******/
const   menuIcon                = document.querySelector('.nav__hamburger');
const   closeIcon               = document.querySelector(".nav__close");
const   cartBtn                 = document.querySelector(".header__cart-icon");
const   nextBtnMob              = document.querySelector(".slider-mob__next-btn");
const   prevBtnMob              = document.querySelector(".slider-mob__prev-btn");
const   incQtyBtn               = document.querySelector(".product-buy__increase-icon");
const   decQtyBtn               = document.querySelector(".product-buy__decrease-icon");
const   inpQty                  = document.getElementById("product-quantity");
const   addToCartBtn            = document.querySelector(".product-buy__add-cart");
const   cartContent             = document.querySelector(".cart-content");
const   desktopSliderThumbs     = Array.from(document.querySelectorAll('.slider-desktop__thumb'));
const   desktopSliderImg        = document.querySelector(".slider-desktop__active-photo img");
const   lightBoxSliderImg       = document.querySelector(".slider-lightbox__active-photo img");
const   closeLightBox           = document.querySelector(".slider-lightbox__close-icon");
const   lightBoxSliderThumbs    = Array.from(document.querySelectorAll('.slider-lightbox__thumb'));
const   nextBtnLightBox         = document.querySelector(".slider-lightbox__next-btn");
const   prevBtnLightBox         = document.querySelector(".slider-lightbox__prev-btn");
let     emptyCartBtn;
let     currentImgIndex         = 0;

/******
 *  Start Events *
  ******/
// Show Navigation menu When click on Menu Icon
menuIcon.addEventListener("click", () => {
    alterClass(document.querySelector(".nav__menu"), "nav__menu--visible", "add");
    addOverlay();
});
// Hide menu Icon When click on Close Icon
closeIcon.addEventListener("click", () => {
    alterClass(document.querySelector(".nav__menu"), "nav__menu--visible", "remove")
    removeOverlay();
});
// Show Cart Content When Click on Cart Icon
cartBtn.addEventListener("click", () => {
    const cartContent = document.querySelector(".cart-content");
    alterClass(cartContent, "cart-content--visible", "toggle");
});

/** Mobile Slider Events  **/
// Slide to Next Item in Slider
nextBtnMob.addEventListener("click", ()=>slide("next"));
// Slide to Previous Item in Slider
prevBtnMob.addEventListener("click", ()=>slide("previous"));

/** Cusomize Input DOM **/
// Increase Quantity Input Value When Click on plus Icon
incQtyBtn.addEventListener("click", incQty);
// Decrease Quantity Input Value When Click on Minus Icon
decQtyBtn.addEventListener("click", decQty);

/** Cart Processing **/
// Add Selected Product data when Click on button && check if button is there
addToCartBtn.addEventListener("click", addToCart);
// Remove Product data From Cart when click on Bin Icon
if(emptyCartBtn){emptyCartBtn.addEventListener("click", emptyCart)};

/*** Desktop Slider Events ***/
desktopSliderThumbs.forEach(element => {
    element.addEventListener("click", function(){
        showClickedPhoto(element, desktopSliderThumbs, desktopSliderImg, "slider-desktop__thumb--active");
        sliderTracker(element, lightBoxSliderThumbs, lightBoxSliderImg, "slider-lightbox__thumb--active");
    });
});

/*** Lightbox Slider Evens***/
// Show LightBox
desktopSliderImg.addEventListener("click", ()=>{
    alterClass(document.querySelector(".slider-lightbox"), "slider-lightbox--visible", "add");
    addOverlay();
});
// Hide LightBox
closeLightBox.addEventListener("click", () => {
    alterClass(document.querySelector(".slider-lightbox"), "slider-lightbox--visible", "remove");
    removeOverlay();
});
// Show clicked Photo
lightBoxSliderThumbs.forEach(element => {
    element.addEventListener("click", function(){
        showClickedPhoto(element, lightBoxSliderThumbs, lightBoxSliderImg, "slider-lightbox__thumb--active");
        sliderTracker(element, desktopSliderThumbs, desktopSliderImg, "slider-desktop__thumb--active");
    });
});
// Hide Light Box
document.addEventListener("click", (e)=>{
    if(e.target.classList.contains("overlay")){
        alterClass(document.querySelector(".slider-lightbox"), "slider-lightbox--visible", "remove");
        removeOverlay();
        alterClass(document.querySelector(".nav__menu"), "nav__menu--visible", "remove")
    }
});
// Slide by controls
prevBtnLightBox.addEventListener("click", (e) => lightboxSlide("previous"));
nextBtnLightBox.addEventListener("click", (e) => lightboxSlide("next"));
/*****
    **  Main Functions  **
*****/
function alterClass(element, class_name, processName){
    if(processName === "add"){
        element.classList.add(class_name);
    }else if(processName === "remove"){
        if(element.classList.contains(class_name)){
            element.classList.remove(class_name);
        }
    }else if(processName === "toggle"){
        element.classList.toggle(class_name);
    }
}
function addOverlay(){
    if(!document.body.contains(document.querySelector(".overlay"))){
        const overlayElement = document.createElement("div");
        overlayElement.classList.add("overlay");
        document.body.append(overlayElement);
    }
}
function removeOverlay(){
    if(document.body.contains(document.querySelector(".overlay"))){
        document.querySelector(".overlay").remove();
    }
}
function slide(slideTo){
    const sliderBar         = document.querySelector(".slider-mob__bar");
    const slideWidth        = document.querySelector('.slider-mob__item').offsetWidth;
    const sliderItemsNum    = Array.from(document.querySelectorAll(".slider-mob__item"))
    if(slideTo === "next"){
        if(sliderBar.scrollLeft < (sliderItemsNum.length - 1) * slideWidth){
            sliderBar.scrollLeft += slideWidth;
        }
    }else if(slideTo === "previous"){
        if(sliderBar.scrollLeft > 0){
            sliderBar.scrollLeft -= slideWidth;
        }
    }
}
function incQty(){
    inpQty.value++;
}
function decQty(){
    if(inpQty.value > 0){
        inpQty.value--;
    }
}
function addToCart(){
    // Declare cart icon
    const cartIcon = document.querySelector(".header__cart-icon");
    // Create Span
    const qtyDom = document.createElement("span");
    // Get User Input Value
    const qtyValue = Number(inpQty.value);
    if(typeof qtyValue === "number" && qtyValue > 0){
        // Add Quantity Number to Span
        qtyDom.innerHTML = qtyValue;
        if(cartIcon.contains(cartIcon.querySelector("span"))){
            console.log("it contains");
            Array.from(cartIcon.querySelectorAll("span")).map((e)=>{
                e.remove();
            });
        }
        // Add Quantity Span to Dom
        cartIcon.appendChild(qtyDom);
        // Add Product to Cart
        cartContent.innerHTML = `
        <h3 class="cart-content__heading">Cart</h3>
        <div class="cart-content__full">
            <div class="cart-content__product">
                <div class="cart-content__prod-img"><img src="images/image-product-1-thumbnail.jpg" alt="Product"></div>
                <div class="cart-content__prod-text">
                    <h6>Autumn Limited Edition...</h6>
                    <div class="cart-content__prod-price">$125.00 * ${qtyValue} <span>$${125.00 * qtyValue}</span></div>
                </div>
                <div class="cart-content__bin-icon">
                    <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill-rule="nonzero" xlink:href="#a"/></svg>
                </div>
            </div>
            <button class="cart-content__btn">Checkout</button>
        </div>`;
        emptyCartBtn    = document.querySelector(".cart-content__bin-icon");
        if(emptyCartBtn){emptyCartBtn.addEventListener("click", emptyCart)};
    }else{
        alert(`You can't Buy ${inpQty.value} Products`);
    }
}
function emptyCart(){
    // Declare cart icon
    const cartIcon = document.querySelector(".header__cart-icon");
    /** Empty Cart Icon **/
    // check if cart icon contains Quantity span
    if(cartIcon.contains(cartIcon.querySelector("span"))){
        console.log("it contains");
        // Loop through All of Quantity Span elements
        Array.from(cartIcon.querySelectorAll("span")).map((e)=>{
            // Remove Span Element
            e.remove();
        });
    }
    cartContent.innerHTML = `
        <h3 class="cart-content__heading">Cart</h3>
        <div class="cart-content__empty">
            Your cart is empty.
        </div>
    `;
}
function showClickedPhoto (element, siblings, visibleImg, class_name){
    const srcImg = element.getAttribute("data-src");
    visibleImg.setAttribute("src", srcImg);
    siblings.forEach((e)=>{
        if(e.classList.contains(class_name)){
            e.classList.remove(class_name);
        }
    });
    element.classList.add(class_name);
}
function addOverlay(){
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);
}
function removeOverlay(){
    if(document.body.contains(document.body.querySelector(".overlay"))){
        document.body.querySelector(".overlay").remove();
    }
}
function sliderTracker(element, siblings, visibleImg, class_name){
    const srcImg = element.getAttribute("data-src");
    visibleImg.setAttribute("src", srcImg);
    siblings.forEach((e)=>{
        alterClass(e, class_name, "remove");
        if(element.getAttribute("data-src") === e.getAttribute("data-src")){
            alterClass(e, class_name, "add");
        }
    });
}
function lightboxSlide(slideTo){
    lightBoxSliderThumbs.forEach((e, i) => {
        if(e.classList.contains("slider-lightbox__thumb--active")){
            currentImgIndex = i;
        }
    });
    if(slideTo === "next"){
        if(currentImgIndex < lightBoxSliderThumbs.length - 1){
            lightBoxSliderThumbs[currentImgIndex].classList.remove("slider-lightbox__thumb--active");
            currentImgIndex++;
            lightBoxSliderImg.setAttribute("src", lightBoxSliderThumbs[currentImgIndex].getAttribute("data-src"));
            lightBoxSliderThumbs[currentImgIndex].classList.add("slider-lightbox__thumb--active");
            sliderTracker(lightBoxSliderThumbs[currentImgIndex], desktopSliderThumbs, desktopSliderImg, "slider-desktop__thumb--active");
        }
    }else if(slideTo === "previous"){
        if(currentImgIndex > 0){
            lightBoxSliderThumbs[currentImgIndex].classList.remove("slider-lightbox__thumb--active");
            currentImgIndex--;
            lightBoxSliderImg.setAttribute("src", lightBoxSliderThumbs[currentImgIndex].getAttribute("data-src"));
            lightBoxSliderThumbs[currentImgIndex].classList.add("slider-lightbox__thumb--active");
            sliderTracker(lightBoxSliderThumbs[currentImgIndex], desktopSliderThumbs, desktopSliderImg, "slider-desktop__thumb--active");
        }
    }
}