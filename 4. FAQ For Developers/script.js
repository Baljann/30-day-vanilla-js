document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', function () {
    const answer = button.nextElementSibling;

    document.querySelectorAll('.faq-answer').forEach((item) => {
      if (item !== answer) {
        item.classList.remove('active');
        item.previousElementSibling.classList.remove('active');
      }
    });

    answer.classList.toggle('active');
    button.classList.toggle('active');
  });
});
