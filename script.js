const inputs = {
  name: document.getElementById("name"),
  title: document.getElementById("title"),
  company: document.getElementById("company"),
  phone: document.getElementById("phone"),
  email: document.getElementById("email"),
  website: document.getElementById("website"),
  bgColor: document.getElementById("bgColor"),
  accentColor: document.getElementById("accentColor"),
};

const card = document.getElementById("card");
const cardName = document.getElementById("cardName");
const cardTitle = document.getElementById("cardTitle");
const cardCompany = document.getElementById("cardCompany");
const cardLogo = document.getElementById("cardLogo");
const cardPhone = document.getElementById("cardPhone");
const cardEmail = document.getElementById("cardEmail");
const cardWebsite = document.getElementById("cardWebsite");
const cardAccent = document.getElementById("cardAccent");

function updateCard() {
  cardName.textContent = inputs.name.value || "Your Name";
  cardTitle.textContent = inputs.title.value || "Your Title";
  cardCompany.textContent = inputs.company.value || "Your Company";

  const initials = (inputs.company.value || inputs.name.value || "Logo")
    .split(" ")
    .filter(Boolean)
    .map(word => word[0].toUpperCase())
    .slice(0, 2)
    .join("");
  cardLogo.textContent = initials;

  cardPhone.textContent = inputs.phone.value;
  cardEmail.textContent = inputs.email.value;
  cardWebsite.textContent = inputs.website.value;

  const bg = inputs.bgColor.value;
  const accent = inputs.accentColor.value;

  card.style.background = `linear-gradient(135deg, ${bg}, #1f2937)`;
  cardAccent.style.background = `radial-gradient(circle at 30% 30%, ${accent}, transparent 60%)`;
  cardWebsite.style.color = accent;
}

Object.values(inputs).forEach(input => {
  input.addEventListener("input", updateCard);
});

updateCard();

document.getElementById("downloadBtn").addEventListener("click", async () => {
  const canvas = await html2canvas(card, { scale: 3 });
  const link = document.createElement("a");
  link.download = "business-card.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

document.getElementById("printBtn").addEventListener("click", () => {
  const printWindow = window.open("", "_blank");
  const clone = card.cloneNode(true);

  printWindow.document.write(`
    <html>
      <head><title>Print Card</title></head>
      <body style="display:flex;justify-content:center;align-items:center;height:100vh;background:#f4f4f7;">
      </body>
    </html>
  `);

  printWindow.document.body.appendChild(clone);
  printWindow.document.close();
  setTimeout(() => printWindow.print(), 300);
});
