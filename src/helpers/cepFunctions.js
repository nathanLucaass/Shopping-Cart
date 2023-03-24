export const getAddress = (cep) => {
  function fetchCepInfo1() {
    return new Promise((resolve, reject) => {
      fetch(`https://cep.awesomeapi.com.br/json/${cep}`)
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function fetchCepInfo2() {
    return new Promise((resolve, reject) => {
      fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`)
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  return Promise.any([fetchCepInfo1(cep), fetchCepInfo2(cep)])
    .then((result) => {
      console.log(result);
      return result; // Retorna o resultado da Promise vencedora
    })
    .catch((error) => {
      console.error(error);
      throw error; // Lança o erro novamente para quem chamou a função
    });
};

export const searchCep = async () => {
  // seu código aqui
  const span = document.querySelector('.cart__address');
  try {
    const cepImput = document.querySelector('.cep-input').value;
    const fi = await getAddress(cepImput);
    if (fi.code === 'invalid' || fi.code === 'not_found') {
      span.innerHTML = 'CEP não encontrado';
    } else {
      span.innerHTML = `${fi.address} - ${fi.district} - ${fi.city} - ${fi.state}`;
    }
  } catch (error) {
    span.innerHTML = 'CEP não encontrado';
  }
};

const cepButton = document.querySelector('.cep-button');
cepButton.addEventListener('click', async () => {
  searchCep();
});
