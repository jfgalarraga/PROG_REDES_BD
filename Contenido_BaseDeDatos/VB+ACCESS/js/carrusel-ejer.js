function showExample(num) {
    const examples = document.querySelectorAll('.example');
    examples.forEach((example) => example.classList.remove('active'));
    document.getElementById('example' + num).classList.add('active');
    resetButtons(num);
  }

  function toggleSolution(exampleNum) {
    const solution = document.getElementById('solution' + exampleNum);
    const btnSolution = document.getElementById('btnSolution' + exampleNum);
    const btnBack = document.getElementById('btnBack' + exampleNum);
    
    solution.style.display = 'block';
    btnSolution.disabled = true;
    btnBack.style.display = 'inline-block';
  }

  function backExample(exampleNum) {
    const solution = document.getElementById('solution' + exampleNum);
    const btnSolution = document.getElementById('btnSolution' + exampleNum);
    const btnBack = document.getElementById('btnBack' + exampleNum);
    
    solution.style.display = 'none';
    btnSolution.disabled = false;
    btnBack.style.display = 'none';
  }

  function resetButtons(exampleNum) {
    // Reset all buttons in the example
    const solution = document.getElementById('solution' + exampleNum);
    const btnSolution = document.getElementById('btnSolution' + exampleNum);
    const btnBack = document.getElementById('btnBack' + exampleNum);
    
    solution.style.display = 'none';
    btnSolution.disabled = false;
    btnBack.style.display = 'none';
  }