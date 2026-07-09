document.addEventListener("DOMContentLoaded", () => {

 });  
// ===============================
// TREEHOUSE MASSAGE
// script.js
// ===============================

// ===============================
// STICKY HEADER
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("sticky");

    } else {

        header.classList.remove("sticky");

    }

});

// ===============================
// MOBILE MENU
// ===============================

const menuBtn = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("active");

    });

}

// ===============================
// CLOSE MENU AFTER CLICK
// ===============================

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        if (nav) {

            nav.classList.remove("active");

        }

    });

});

// ===============================
// SMOOTH SCROLL
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

// ===============================
// BACK TO TOP BUTTON
// ===============================

const backTop = document.getElementById("backTop");

if(backTop){

window.addEventListener("scroll",()=>{

    if(window.scrollY>400){

        backTop.classList.add("show");

    }else{

        backTop.classList.remove("show");

    }

});

backTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

}

// ===============================
// SCROLL ANIMATION
// ===============================

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{

threshold:0.15

});

document.querySelectorAll(".fade-up").forEach(el=>{

observer.observe(el);

});

// ===============================
// GALLERY POPUP
// ===============================

const gallery = document.querySelectorAll(".gallery img");

gallery.forEach(img=>{

img.addEventListener("click",()=>{

const overlay=document.createElement("div");

overlay.className="image-overlay";

overlay.innerHTML=`

<div class="popup">

<img src="${img.src}">

</div>

`;

document.body.appendChild(overlay);

overlay.addEventListener("click",()=>{

overlay.remove();

});

});

});

// ===============================
// LOYALTY MEMBER
// ===============================
const memberAPI = "https://script.google.com/macros/s/AKfycbzxSxvIc9MHqxOCAFwNBWMulz02hn74r1yh-YXP29wOpOuyp6BlrJ3IVhy98ZDvHmM/exec";

const checkButton=document.getElementById("checkMember");

const memberInput = document.getElementById("memberCode");


if(checkButton){

checkButton.addEventListener("click",()=>{

const input = document.getElementById("memberCode").value.trim();

const parts = input.split("/");

if(parts.length !== 2){

    alert("Format : Name / Member Code");

    return;

}


let name = "";
let code = "";


parts.forEach(item=>{

    item = item.trim();


    // deteksi kode member
    if(/^TM-?/i.test(item)){

        code = item
            .toUpperCase();

    }
    else{

        name = item;

    }

});



if(name==="" || code===""){

    alert("Please enter Name and Member Code");

    return;

}

if(name==="" || code===""){

    alert("Format : Name / Member Code");

    return;

}

const result=document.getElementById("memberResult");



result.innerHTML = `

<div class="member-loading">


    <div class="loading-logo">

        <img src="images/logo/logo.png" alt="Treehouse Massage">

    </div>


    <h3>

        Checking Member

    </h3>


    <p>

        Preparing your loyalty rewards...

    </p>


</div>

`;

localStorage.setItem("lastMemberSearch", input);

fetch(
`${memberAPI}?action=member&name=${encodeURIComponent(name)}&code=${encodeURIComponent(code)}`
)

.then(response => response.json())

.then(data=>{


    if(!data.success){


        result.innerHTML = `

<div class="member-error">


    <div class="error-icon">

        <i class="fas fa-search"></i>

    </div>


    <h3>

        Member Not Found

    </h3>


    <p>

        We couldn't find your membership information.

        <br>

        Please check your Name / Member Code format.<br>

        or contact us for assistance.

    </p>


</div>

`;


        return;

    }

    const member = {

    name: data.name,

    code: data.code,

    totalStamp: data.available,

    maxStamp: 10,

    lastVisit: data.lastStampDate,

    lastPayment: data.lastStampAmount

};

const memberBook = document.getElementById("memberBook");

if(memberBook){

    memberBook.addEventListener("click",()=>{

        document.getElementById("bookBtn").click();

    });

}

const currentStamp = member.totalStamp % member.maxStamp;

const displayStamp = currentStamp === 0 && member.totalStamp > 0
    ? member.maxStamp
    : currentStamp;

const percent = (displayStamp / member.maxStamp) * 100;

const rewardCount = Math.floor(member.totalStamp / member.maxStamp);

let stars = "";

for(let i = 1; i <= member.maxStamp; i++){

    if(i <= displayStamp){

        stars += `<div class="stamp active"></div>`;

    }else{

        stars += `<div class="stamp"></div>`;

    }

}

result.innerHTML=`

<div class="member-profile">

    <div class="member-top">

        <div>

            <span class="member-badge">

                Loyalty Member

            </span>

            <h3>

                ${member.name}

            </h3>

            <p class="member-code">

                ${member.code}

            </p>

        </div>

        <div class="member-icon">

    <img
        src="images/logo/logo.png"
        alt="Treehouse Massage">

</div>

    </div>

    

    <div class="member-section">

    <h4>

        Available Stamp

    </h4>

    <div class="stamp-list">

        ${stars}

    </div>

    <div class="stamp-summary">

        <strong>

            ${member.totalStamp}

        </strong>

        <small>

            Total Stamps

        </small>

    </div>

    <div class="reward-grid">

        <div class="reward-box">

            <span>

                🎯 Next Reward

            </span>

            <strong>

                ${displayStamp} / ${member.maxStamp}

            </strong>

        </div>

        <div class="reward-box">

            <span>

                🎁 Rewards Earned

            </span>

            <strong>

                ${rewardCount}

            </strong>

        </div>

    </div>

</div>

    <div class="member-detail">

    <div class="detail-card">

        <div class="detail-icon">

            <i class="far fa-calendar-check"></i>

        </div>

        <div>

            <small>

                Last Visit

            </small>

            <strong>

                ${member.lastVisit}

            </strong>

        </div>

    </div>

    <div class="detail-card">

        <div class="detail-icon">

            <i class="fas fa-seedling"></i>

        </div>

        <div>

            <small>

                Last Stamp

            </small>

            <strong>

                ${member.lastPayment} Stamp

            </strong>

        </div>

    </div>

</div>

    <button
    type="button"
    class="btn member-book-btn"
    id="memberBook">

    <i class="fab fa-whatsapp"></i>

    Book Your Next Massage

    </button>
</div>

`;



const stampItems = result.querySelectorAll(".stamp");

stampItems.forEach((stamp,index)=>{


    console.log(data);


});



    setTimeout(()=>{

        stamp.classList.add("show");

    },index*80);

});
});

}

// ===============================
// LOADING SCREEN
// ===============================

window.addEventListener("load",()=>{

const loader=document.querySelector(".loader");

if(loader){

loader.classList.add("hide");

setTimeout(()=>{

loader.remove();

},500);

}

});

// ===============================
// CURRENT YEAR
// ===============================

const year=document.getElementById("year");

if(year){

year.textContent=new Date().getFullYear();

}



document.addEventListener("DOMContentLoaded", function () {

    const bookButtons = document.querySelectorAll(".open-book");
    const bookMenu = document.getElementById("bookMenu");
    const waFloat = document.getElementById("waFloat");

    if (bookButtons.length === 0 || !bookMenu) {
    console.error("Book dropdown element tidak ditemukan");
    return;
    }

    bookButtons.forEach(function(bookBtn){

    bookBtn.addEventListener("click", function(e){

    e.stopPropagation();

    const rect = bookBtn.getBoundingClientRect();

    // ======================================
    // BOOK BUTTON DI LOYALTY SECTION
    // ======================================

    if(bookBtn.classList.contains("member-book-btn")){

        bookMenu.style.left =
            rect.left + (rect.width - bookMenu.offsetWidth) / 2 + "px";

        bookMenu.style.top =
            (rect.top - bookMenu.offsetHeight - 10) + "px";

    }

    // ======================================
    // MOBILE HEADER
    // ======================================

    else if(window.innerWidth <= 600){

        bookMenu.style.left =
            (window.innerWidth - bookMenu.offsetWidth) / 2 + "px";

        bookMenu.style.top =
            (rect.top - bookMenu.offsetHeight - 12) + "px";

    }

    // ======================================
    // DESKTOP HEADER
    // ======================================

    else{

        bookMenu.style.left = rect.left + "px";
        bookMenu.style.top = (rect.bottom + 10) + "px";

    }

    bookMenu.classList.toggle("show");

});

});

    waFloat.addEventListener("click", function(e){

    e.stopPropagation();

    const rect = waFloat.getBoundingClientRect();

    bookMenu.style.left = (rect.right - 200) + "px";
    bookMenu.style.top = (rect.top - bookMenu.offsetHeight - 10) + "px";

    bookMenu.classList.toggle("show");

});
    document.addEventListener("click", function () {
        bookMenu.classList.remove("show");
    });

    bookMenu.addEventListener("click", function (e) {
        e.stopPropagation();
    });

});

/*======================================
FAQ
======================================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const btn = item.querySelector(".faq-question");

    btn.addEventListener("click", () => {

        faqItems.forEach(other => {

            if(other !== item){

                other.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});

// ===============================
// LOAD LAST SEARCH
// ===============================



if(memberInput){

    const lastSearch = localStorage.getItem("lastMemberSearch");

    if(lastSearch){

        memberInput.value = lastSearch;

    }

}