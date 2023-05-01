export function toUpperCaseButton(arr) {
  arr.forEach((el) => {
    const res = el;
    if (!res.classList.contains('not-uppercase')) {
      res.textContent = el.textContent.toUpperCase();
    }
  });
}

export function toLowerCaseButton(arr) {
  arr.forEach((el) => {
    const res = el;
    res.textContent = el.textContent.toLowerCase();
  });
}
