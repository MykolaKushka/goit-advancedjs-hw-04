import{a as b,S as E,i as a}from"./assets/vendor-BMFj4jqR.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const L="11098125-871cfab26b5ca42e81d1a6284",w="https://pixabay.com/api/",f=async(r,s=1,i=15)=>{try{return(await b.get(w,{params:{key:L,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:i}})).data}catch(o){throw console.error("Error fetching images:",o),o}},y=r=>{const s=r.map(({webformatURL:i,largeImageURL:o,tags:e,likes:t,views:n,comments:h,downloads:v})=>`
        <div class="gallery-item">
          <a href="${o}">
            <img src="${i}" alt="${e}" loading="lazy" />
          </a>
          <div class="image-info">
            <div><span>Likes</span> ${t}</div>
            <div><span>Views</span> ${n}</div>
            <div><span>Comments</span> ${h}</div>
            <div><span>Downloads</span> ${v}</div>
          </div>
        </div>
      `).join("");document.querySelector(".gallery").insertAdjacentHTML("beforeend",s)},S=document.getElementById("search-form"),p=document.querySelector(".gallery"),l=document.querySelector(".load-more");let d="",c=1;const m=15;let u=0;const g=new E(".gallery a",{captionsData:"alt",captionDelay:250});l.style.display="none";S.addEventListener("submit",async r=>{if(r.preventDefault(),d=r.currentTarget.elements.searchQuery.value.trim(),c=1,p.innerHTML="",l.style.display="none",d===""){a.error({title:"Error",message:"Enter a valid search term!"});return}try{const s=await f(d,c,m);if(u=s.totalHits,u===0){a.warning({title:"No Results",message:"No images found. Try another query."});return}y(s.hits),g.refresh(),a.success({title:"Success",message:`Found ${u} images!`}),s.totalHits>m&&(l.style.display="block")}catch{a.error({title:"Error",message:"Failed to fetch images. Try again later."})}});l.addEventListener("click",async()=>{c+=1;try{const r=await f(d,c,m);y(r.hits),g.refresh(),c*m>=u&&(l.style.display="none",a.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."})),$()}catch{a.error({title:"Error",message:"Failed to fetch images. Try again later."})}});function $(){const{height:r}=p.firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
