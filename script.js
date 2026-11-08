const PRODUCTS = [
    {
        id: "original",
        name: "Takoyaki Original",
        category: "Original",
        price: 15000,
        image: "takoyaki original.jpg",
        desc: "Takoyaki klasik dengan adonan lembut, saus takoyaki, mayones, dan taburan Katsuobushi di atasnya.",
        tag: "Favorit",
        spec: [
            "Isi 6 pcs",
            "Saus takoyaki dan mayones",
            "Taburan bonito flakes"
        ]
    },
    {
        id: "cumi",
        name: "Takoyaki Cumi",
        category: "Seafood",
        price: 17000,
        image: "takoyaki cumi.jpg",
        desc: "Takoyaki dengan isian cumi yang gurih dengan taburan Katsuobushi di atasnya dan tekstur lembut di setiap gigitan.",
        tag: "Seafood",
        spec: [
            "Isi 6 pcs",
            "Isian cumi",
            "Saus original / pedas"
        ]
    },
    {
        id: "keju",
        name: "Takoyaki Keju",
        category: "Cheese",
        price: 18000,
        image: "takoyaki keju.jpeg",
        desc: "Perpaduan takoyaki hangat dengan isian keju yang creamy dan gurih dengan taburan Katsuobushi di atasnya.",
        tag: "Cheese",
        spec: [
            "Isi 6 pcs",
            "Isian keju",
            "Topping saus dan mayones"
        ]
    },
    {
        id: "mozarella",
        name: "Takoyaki Mozarella",
        category: "Cheese",
        price: 19000,
        image: "takoyaki mozarella.jpeg",
        desc: "Varian keju mozzarella yang lumer untuk pencinta rasa creamy dengan taburan Katsuobushi di atasnya.",
        tag: "Lumer",
        spec: [
            "Isi 6 pcs",
            "Mozarella",
            "Dibuat saat dipesan"
        ]
    },
    {
        id: "spesial",
        name: "Takoyaki Spesial",
        category: "Premium",
        price: 35000,
        image: "takoyaki spesial.jpg",
        desc: "Takoyaki dengan topping lebih lengkap untuk pengalaman ngemil yang spesial.",
        tag: "Premium",
        spec: [
            "Isi 12 pcs",
            "Topping spesial",
            "Saus takoyaki dan mayones"
        ]
    },
    {
        id: "double-cheese",
        name: "Takoyaki Double Cheese",
        category: "Premium",
        price: 24000,
        image: "takoyaki double cheese.jpg",
        desc: "Porsi keju ekstra dengan rasa gurih yang lebih terasa dan taburan Katsuobushi di atasnya.",
        tag: "Premium",
        spec: [
            "Isi 6 pcs",
            "Double cheese",
            "Topping saus dan mayones"
        ]
    }
];

const rupiah = (number) => {
    return "Rp " + Number(number).toLocaleString("id-ID");
};

const imgPath = (name) => {
    return name;
};

const waNumber = "628812466667";
const emailShop = "takoyakihayyukk@gmail.com";

function waLink(message) {
    return "https://wa.me/" + waNumber +
        "?text=" + encodeURIComponent(message);
}

const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

if (toggle && nav) {

    toggle.addEventListener("click", () => {

        nav.classList.toggle("open");

        const isOpen = nav.classList.contains("open");

        toggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        toggle.textContent = isOpen ? "×" : "☰";

    });

    // Tutup menu setelah salah satu link diklik.
    nav.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");

            toggle.setAttribute("aria-expanded", "false");

            toggle.textContent = "☰";

        });

    });

}

function productCard(product) {

    return `
        <article class="product-card">

            <a href="detail.html?id=${product.id}"
               aria-label="Lihat detail ${product.name}">

                <img
                    src="${imgPath(product.image)}"
                    alt="${product.name}"
                    loading="lazy"
                >

            </a>

            <div class="product-card-body">

                <span class="badge">
                    ${product.tag}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.desc}
                </p>

                <div class="card-bottom">

                    <span class="price">
                        ${rupiah(product.price)}
                    </span>

                    <a class="small-btn"
                       href="detail.html?id=${product.id}">
                        Lihat menu →
                    </a>

                </div>

            </div>

        </article>
    `;
}

const catalog = document.getElementById("catalog-products");

if (catalog) {

    const searchInput = document.getElementById("search-input");
    const categoryFilter = document.getElementById("category-filter");
    const sortFilter = document.getElementById("sort-filter");
    const resultCount = document.getElementById("result-count");
    const emptyState = document.getElementById("empty-state");

    // Pastikan elemen katalog tersedia.
    if (
        searchInput &&
        categoryFilter &&
        sortFilter &&
        resultCount &&
        emptyState
    ) {

        function filterProducts() {

            const keyword = searchInput.value.toLowerCase().trim();
            const category = categoryFilter.value;

            const cards = Array.from(
                catalog.querySelectorAll(".product-card")
            );

            let visibleCards = [];

            cards.forEach((card) => {

                const name = (card.dataset.name || "").toLowerCase();
                const cardCategory = card.dataset.category || "";

                const matchesSearch =
                    name.includes(keyword) ||
                    cardCategory.toLowerCase().includes(keyword);

                const matchesCategory =
                    category === "" || cardCategory === category;

                const shouldShow =
                    matchesSearch && matchesCategory;

                card.hidden = !shouldShow;

                if (shouldShow) {
                    visibleCards.push(card);
                }

            });


            // Urutkan harga terendah.
            if (sortFilter.value === "low") {

                visibleCards.sort((a, b) =>
                    Number(a.dataset.price) -
                    Number(b.dataset.price)
                );

            }

            // Urutkan harga tertinggi.
            else if (sortFilter.value === "high") {

                visibleCards.sort((a, b) =>
                    Number(b.dataset.price) -
                    Number(a.dataset.price)
                );

            }

            // Urutkan nama A-Z.
            else if (sortFilter.value === "name") {

                visibleCards.sort((a, b) =>
                    (a.dataset.name || "").localeCompare(
                        b.dataset.name || ""
                    )
                );

            }


            // Tampilkan produk sesuai urutan.
            visibleCards.forEach((card) => {
                catalog.appendChild(card);
            });


            // Jumlah produk yang ditampilkan.
            resultCount.textContent =
                "Menampilkan " + visibleCards.length +
                " dari " + cards.length + " menu.";


            // Pesan jika produk tidak ditemukan.
            emptyState.classList.toggle(
                "hidden",
                visibleCards.length > 0
            );

        }


        // Membaca kategori dari URL.
        const params = new URLSearchParams(window.location.search);

        const selectedCategory = params.get("category");

        if (selectedCategory) {
            categoryFilter.value = selectedCategory;
        }


        // Event pencarian.
        searchInput.addEventListener("input", filterProducts);

        // Event filter kategori.
        categoryFilter.addEventListener("change", filterProducts);

        // Event pengurutan produk.
        sortFilter.addEventListener("change", filterProducts);


        // Jalankan filter pertama kali.
        filterProducts();

    }

}

const detailName = document.getElementById("detail-name");

if (detailName) {

    const id = new URLSearchParams(location.search).get("id") || "cumi";

    const product = PRODUCTS.find((item) => item.id === id) || PRODUCTS[1];


    // Mengambil elemen HTML.
    const detailImage = document.getElementById("detail-image");
    const detailCategory = document.getElementById("detail-category");
    const detailPrice = document.getElementById("detail-price");
    const detailDescription = document.getElementById("detail-description");
    const detailSpecs = document.getElementById("detail-specs");
    const detailQty = document.getElementById("detail-qty");
    const detailWa = document.getElementById("detail-wa");
    const detailEmail = document.getElementById("detail-email");


    // Mengubah judul halaman.
    document.title = product.name + " | Takoyaki Hayyukk";


    // Menampilkan gambar produk.
    if (detailImage) {

        detailImage.src = imgPath(product.image);

        detailImage.alt = product.name;

    }


    // Menampilkan nama produk.
    detailName.textContent = product.name;


    // Menampilkan kategori.
    if (detailCategory) {
        detailCategory.textContent = product.category;
    }


    // Menampilkan harga.
    if (detailPrice) {
        detailPrice.textContent = rupiah(product.price);
    }


    // Menampilkan deskripsi.
    if (detailDescription) {
        detailDescription.textContent = product.desc;
    }


    // Menampilkan informasi menu.
    if (detailSpecs) {

        detailSpecs.innerHTML = product.spec
            .map((item) => `<li>${item}</li>`)
            .join("");

    }

    if (detailWa) {

        detailWa.addEventListener("click", () => {

            const qty = Math.max(
                1,
                Number(detailQty?.value) || 1
            );

            const selectedPayment = document.querySelector(
                'input[name="payment"]:checked'
            );

            const pay = selectedPayment
                ? selectedPayment.value
                : "Belum dipilih";

            const total = product.price * qty;

            const message = `
Halo Takoyaki Hayyukk, saya ingin memesan:

Menu: ${product.name}
Harga: ${rupiah(product.price)} / porsi
Jumlah: ${qty} porsi
Total: ${rupiah(total)}
Pembayaran: ${pay}

Mohon info ketersediaan dan cara pemesanannya. Terima kasih.
            `;

            window.open(
                waLink(message),
                "_blank",
                "noopener"
            );

        });

    }

    if (detailEmail) {

        detailEmail.href =
            `mailto:${emailShop}?subject=${
                encodeURIComponent("Pertanyaan pesanan " + product.name)
            }`;

    }

}

const form = document.getElementById("contact-form");

if (form) {

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        const data = new FormData(form);

        const subject =
            `${data.get("purpose")} - Takoyaki Hayyukk`;

        const body = `
Nama: ${data.get("name")}
Email: ${data.get("email")}
Keperluan: ${data.get("purpose")}

Pesan:
${data.get("message")}
        `;

        location.href =
            `mailto:${emailShop}?subject=${
                encodeURIComponent(subject)
            }&body=${
                encodeURIComponent(body)
            }`;

    });

}