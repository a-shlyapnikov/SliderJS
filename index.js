
const sliderData = [
    {
        img: 'https://images.unsplash.com/photo-1699388642049-d88d57cc7d4a?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Nature, Marek Piwnicki'
    },
    {
        img: 'https://images.unsplash.com/photo-1699125680104-308d0ae2661b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Fog, Pramod Tiwari'
    },
    {
        img: 'https://images.unsplash.com/photo-1699362232821-b2eccfc516e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'City, Maëva Vigier'
    },
    {
        img: 'https://images.unsplash.com/photo-1697137031945-78dda795e5ac?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Maountains, Marek Piwnicki'
    },
    {
        img: 'https://images.unsplash.com/photo-1510279770292-4b34de9f5c23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Sea, Iswanto Arif'
    }
];

const sliderEl = document.querySelector('.slider');
const paginationEl = document.querySelector('.pagination');
const prevBtnEl = paginationEl.querySelector('.prev-btn');
const nextBtnEl = paginationEl.querySelector('.next-btn');

let CURRENT_SLIDE = 1;

window.addEventListener('DOMContentLoaded', () => {
    setup(CURRENT_SLIDE);
})

sliderData.forEach((slide, index) => {
    nextBtnEl.insertAdjacentHTML('beforebegin', getPaginationLiTemplate(index + 1));
});

paginationEl.addEventListener('click', ({ target }) => {
    if (target.matches('.btn-id a')) {
        const id = target.parentNode.dataset.id;
        if (!(CURRENT_SLIDE === +id)) {
            changeSlide(id, target.parentNode);
            CURRENT_SLIDE = +id;
        }

    }

    if (target.matches('.prev-btn a')) {
        if (CURRENT_SLIDE > 1) {
            CURRENT_SLIDE--
            changeSlide(CURRENT_SLIDE)
        } else {
            changeSlide(sliderData.length)
            CURRENT_SLIDE = sliderData.length
        }
    }
    if (target.matches('.next-btn a')) {
        if (CURRENT_SLIDE === sliderData.length) {
            CURRENT_SLIDE = 1;
            changeSlide(CURRENT_SLIDE)
        } else {
            CURRENT_SLIDE++;
            changeSlide(CURRENT_SLIDE)
        }
    }
});



const paginationList = paginationEl.querySelectorAll('li');

function setup(index) {
    sliderEl.innerHTML = getSlideTemplate(sliderData[index - 1]);
    changeActive(document.querySelector(`li[data-id="${index}"`));
}

function changeSlide(id) {
    const slide = sliderEl.querySelector('.slide');
    slide.classList.add('fade-out')
    slide.addEventListener('transitionend', ()=>{
        console.log('animation end');
        sliderEl.innerHTML = getSlideTemplate(sliderData[id - 1]);
        const slide = sliderEl.querySelector('.slide');
        slide.classList.add('fade-in');
        
    });
    changeActive(document.querySelector(`li[data-id="${id}"`));
}

function changeActive(node) {
    paginationList.forEach(element => {
        element.classList.remove('active')
    });
    node.classList.add('active');
}


function getPaginationLiTemplate(index) {
    return (`
        <li class="btn-id" data-id="${index}">
            <a href="#">${index}</a>
        </li>
    `)
}

function getSlideTemplate(slide) {
    return (`
        <div class="slide">
            <img src="${slide.img}" alt="${slide.title}">
            <h3>${slide.title}</h3>
        </div>
    `);
}