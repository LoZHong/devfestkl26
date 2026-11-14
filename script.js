const personaData = {
  freelancer: {
    sub: "Smooth out irregular client payments. ClearFlow sets aside taxes and upcoming bills automatically so you know what's truly yours to spend.",
    badge: "Freelancer View",
    amount: "$142.50",
    note: "After setting aside 25% for taxes & upcoming bills.",
    balance: "$4,820.00",
    reservedLabel: "Tax & bill reserve",
    reserved: "-$1,940.00",
    goalLabel: "Auto-saved this month",
    goal: "+$450.00"
  },
  salaried: {
    sub: "Stop wondering where your paycheck went. ClearFlow catches forgotten subscriptions and moves savings out on payday automatically.",
    badge: "Salaried View",
    amount: "$68.00",
    note: "After rent, subscriptions, and your $500 monthly savings goal.",
    balance: "$2,940.00",
    reservedLabel: "Upcoming bills & rent",
    reserved: "-$1,620.00",
    goalLabel: "Payday auto-save",
    goal: "+$500.00"
  },
  couple: {
    sub: "Manage shared household expenses in one calm view—without needing to merge every personal bank account.",
    badge: "Couple View",
    amount: "$115.00",
    note: "Shared daily budget after rent, utilities, and vacation fund.",
    balance: "$6,150.00",
    reservedLabel: "Shared bills & rent",
    reserved: "-$2,850.00",
    goalLabel: "Joint vacation fund",
    goal: "+$800.00"
  }
};

// Persona tab switching
const tabButtons = document.querySelectorAll(".tab-btn");
const heroSub = document.getElementById("hero-sub");
const previewBadge = document.getElementById("preview-badge");
const previewAmount = document.getElementById("preview-amount");
const previewNote = document.getElementById("preview-note");
const previewBalance = document.getElementById("preview-balance");
const previewReservedLabel = document.getElementById("preview-reserved-label");
const previewReserved = document.getElementById("preview-reserved");
const previewGoalLabel = document.getElementById("preview-goal-label");
const previewGoal = document.getElementById("preview-goal");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.persona;
    const data = personaData[key];
    if (!data) return;

    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    heroSub.textContent = data.sub;
    previewBadge.textContent = data.badge;
    previewAmount.textContent = data.amount;
    previewNote.textContent = data.note;
    previewBalance.textContent = data.balance;
    previewReservedLabel.textContent = data.reservedLabel;
    previewReserved.textContent = data.reserved;
    previewGoalLabel.textContent = data.goalLabel;
    previewGoal.textContent = data.goal;
  });
});

// Interactive Demo Modal & Calculator
const modal = document.getElementById("demo-modal");
const openDemoButtons = document.querySelectorAll("[data-open-demo]");
const closeModalBtn = document.getElementById("close-modal");
const modalDoneBtn = document.getElementById("modal-done");

const inputIncome = document.getElementById("input-income");
const inputBills = document.getElementById("input-bills");
const inputSavings = document.getElementById("input-savings");
const calcDaily = document.getElementById("calc-daily");
const calcMonthly = document.getElementById("calc-monthly");

function updateCalculator() {
  const income = Number(inputIncome.value) || 0;
  const bills = Number(inputBills.value) || 0;
  const savings = Number(inputSavings.value) || 0;
  const remaining = income - bills - savings;
  const daily = remaining / 30;

  const formattedMonthly = remaining.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
  const formattedDaily = daily.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });

  calcDaily.textContent = `${formattedDaily} / day`;
  calcMonthly.textContent =
    remaining >= 0
      ? `(${formattedMonthly} left for flexible spending this month)`
      : `(${formattedMonthly} — bills & savings exceed income)`;
}

function openModal() {
  updateCalculator();
  modal.hidden = false;
}

function closeModal() {
  modal.hidden = true;
}

openDemoButtons.forEach((btn) => btn.addEventListener("click", openModal));
closeModalBtn.addEventListener("click", closeModal);
modalDoneBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

[inputIncome, inputBills, inputSavings].forEach((input) => {
  input.addEventListener("input", updateCalculator);
});
