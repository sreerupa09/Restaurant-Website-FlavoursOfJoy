function paginate(items, itemsPerPage, paginationContainer) {
    let currentPage = 1;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    function showItems(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageItems = items.slice(startIndex, endIndex);

        const itemsContainer = document.querySelector("#items");
        itemsContainer.innerHTML = ""; 

        pageItems.forEach((item) => {
            const div = document.createElement("div");
            div.className = "col-md-4 mb-4 d-flex justify-content-center";
            div.innerHTML = `
                <div class="card" style="width: 20rem; background-color: rgba(232, 220, 220, 0.79); border: none; border-radius: 8px; box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);">
                    <img src="${item.image}" class="card-img-top" alt="item" style="width: auto; height: 250px;">
                    <div class="card-body">
                        <h4 class="text-center lusitana-bold">${item.name}</h4>
                        <p class="card-text text-center" style="font-size: 0.9rem; color: rgb(77, 77, 77);">${item.description}</p>
                        <h3 class="text-center">$${item.price}</h3>
                    </div>
                </div>
            `;
            itemsContainer.appendChild(div);
        });
    }

    function setupPagination() {
        const pagination = document.querySelector(paginationContainer);
        pagination.innerHTML = ""; 

        const prevLi=document.createElement("li");
        prevLi.className="page-item";
        const prevLink=document.createElement("a");
        prevLink.className="page-link";
        prevLink.href="#";
        prevLink.innerText="Previous";
        prevLi.appendChild(prevLink);
        pagination.appendChild(prevLi);
        prevLi.classList.toggle("disabled", currentPage === 1);
        prevLink.addEventListener("click",(event) => {
            event.preventDefault();
            if(currentPage>1)
            {
                currentPage--;
                showItems(currentPage);
                setupPagination();
            }
        });

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement("li");
            li.className = "page-item";
            const link = document.createElement("a");
            link.className = "page-link";
            link.href = "#";
            link.innerText = i;

            if (i === currentPage) {
                li.classList.add("active");
            }

            link.addEventListener("click", (event) => {
                event.preventDefault();
                currentPage = i;
                showItems(currentPage);

                const currentActive = pagination.querySelector(".active");
                if (currentActive) currentActive.classList.remove("active");
                li.classList.add("active");
            });

            li.appendChild(link);
            pagination.appendChild(li);
        }

        const nextLi=document.createElement("li");
        nextLi.className="page-item";
        const nextLink=document.createElement("a");
        nextLink.className="page-link";
        nextLink.href="#";
        nextLink.innerText="Next";
        nextLi.appendChild(nextLink);
        pagination.appendChild(nextLi);
        nextLi.classList.toggle("disabled", currentPage === totalPages);
        nextLink.addEventListener("click",(event) => {
            event.preventDefault();
            if(currentPage<totalPages)
            {
                currentPage++;
                showItems(currentPage);
                setupPagination();
            }
        });
    }

    showItems(currentPage);
    setupPagination();
}



