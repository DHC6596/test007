document.addEventListener('DOMContentLoaded', () => {

    // ── Hamburger menu ──
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileNav.classList.toggle('open');
        });

        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileNav.classList.remove('open');
            });
        });
    }

    // ── ACTIVE NAV ON SCROLL FIX ──

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[data-section]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                const activeId = entry.target.id;

                navLinks.forEach(link => {
                    const linkTarget = link.getAttribute('href');

                    if (linkTarget === `#${activeId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }

        });
    }, {
        threshold: 0.4
    });

    // ⭐ THIS IS THE FIX (IMPORTANT PART)
    sections.forEach(section => {
        observer.observe(section);
    });

});

// ── FAQ Accordion Logic ──
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        
        // Close other FAQ items (only one open at a time)
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });

        // Toggle current item
        faqItem.classList.toggle('active');
    });
});


// ── FULL PRODUCT MODAL LOGIC ──

const productData = {
    hydraulic: {
        title: "Hydraulic Solutions",
        specs: [
            ["Standard", "SAE 100 R1, R2, R5, R12, R15"],
            ["Products", "Hoses, Fittings, Ferrules, Adapters"],
            ["Pressure", "Up to 10,000 PSI"],
            ["Applications", "Construction, Mining, Industrial"],
            ["Packaging", "Export quality rolls / Palletized"]
        ]
    },
    building: {
        title: "Building Materials",
        specs: [
            ["Cement", "OPC Grade 43/53, PPC (ISI Certified)"],
            ["Steel", "TMT Bars Fe 500/550D (Standard Lengths)"],
            ["Tiles", "Vitrified, GVT, Wall Tiles (Premium Finish)"],
            ["Adhesives", "Premium Tile & Stone Fix Solutions"],
            ["Packaging", "50kg Bags / Palletized Steel Bundles"]
        ]
    },
    eco: {
        title: "Bamboo & Eco Products",
        specs: [
            ["Personal Care", "Bamboo Toothbrushes, Tongue Cleaners"],
            ["Kitchenware", "Bamboo Bottles, Spoons, Straws"],
            ["Material", "100% Organic & Biodegradable Bamboo"],
	    ["MOQ", "Low MOQ available for Eco-range"],
            ["Certifications", "FDA Compliant Materials"],
            ["Packaging", "Kraft Paper / Zero-Plastic Packaging"]
        ]
    },
    packaging: {
        title: "Disposable & Packaging",
        specs: [
            ["Products", "Bagasse Plates, Bowls, Clamshells"],
            ["Material", "Sugarcane Fiber (Bagasse) / Recycled Paper"],
            ["Features", "Microwave Safe, Leak Proof, Compostable"],
            ["Customization", "Logo Branding Available for Bulk Orders"],
            ["MOQ", "Flexible for small distributors"]
        ]
    },
    industrial: {
        title: "Industrial & General",
        specs: [
            ["Fasteners", "Nuts, Bolts, Washers, Screws (SS/MS)"],
            ["Pipes", "ERW, GI, and Stainless Steel Tubes"],
            ["Hardware", "Industrial Tools & General Supplies"],
            ["Grades", "Standard International ISO Grades"],
            ["Finish", "Galvanized, Polished, or Plain"]
        ]
    },
    mixed: {
        title: "Mixed Container Supply",
        specs: [
            ["Concept", "Combine different products in 1 container"],
            ["LCL Shipping", "Less than Container Load support"],
            ["Benefit", "Reduce inventory costs for your business"],
            ["Sourcing", "We consolidate from multiple partners"],
            ["Support", "Complete documentation for mixed loads"]
        ]
    }
};

const modal = document.getElementById('productModal');
const modalData = document.getElementById('modalData');

document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-product');
        const data = productData[type];

        if(data) {
            let tableHtml = `<h3 style="color:var(--navy); margin-bottom:15px; border-bottom:2px solid var(--primary); padding-bottom:10px;">${data.title}</h3>`;
            tableHtml += `<table class="spec-table">`;
            data.specs.forEach(row => {
                tableHtml += `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`;
            });
            tableHtml += `</table>`;
tableHtml += `<div style="margin-top: 30px; text-align: center;"><a href="https://wa.me/919909550405?text=Hello%20Rahi%20International%2C%0A%0AI%20am%20interested%20in%20importing%20products%20from%20your%20company.%0A%0AProduct%3A%0AQuantity%3A%0ADestination%20Country%3A%0A%0APlease%20share%20quotation%20details." class="btn-enquiry" target="_blank">ENQUIRE FOR FULL SPECS</a></div>`;
            modalData.innerHTML = tableHtml;
            modal.classList.add('active');
        }
    });
});

// Close logic
document.querySelector('.close-modal').addEventListener('click', () => modal.classList.remove('active'));
window.addEventListener('click', (e) => { if(e.target == modal) modal.classList.remove('active'); });


// --- CATALOGUE REQUEST LOGIC ---

const catModal = document.getElementById('catModal');
const navCatBtn = document.getElementById('navCatBtn');
const heroCatBtn = document.getElementById('heroCatBtn');
const closeCat = document.getElementById('closeCat');

// 1. Open the pop-up when buttons are clicked
if(navCatBtn) navCatBtn.addEventListener('click', () => catModal.classList.add('active'));
if(heroCatBtn) heroCatBtn.addEventListener('click', () => catModal.classList.add('active'));

// 2. Close the pop-up when 'X' is clicked
if(closeCat) closeCat.addEventListener('click', () => catModal.classList.remove('active'));

// 3. Handle the choice and send to WhatsApp
document.querySelectorAll('.cat-opt').forEach(button => {
    button.addEventListener('click', () => {
        const productRange = button.getAttribute('data-range');
        const phoneNumber = "919909550405";
        
        // This creates the text message
        const message = `Hello Rahi International, I am interested in your catalogue for: ${productRange}. Please share the details.`;
        
        // This opens WhatsApp
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
        catModal.classList.remove('active'); // Close the window after clicking
    });
});

document.querySelectorAll('.mobile-cat-trigger').forEach(btn => btn.addEventListener('click', () => catModal.classList.add('active')));
