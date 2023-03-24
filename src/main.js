import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';
import './style.css';

const geral = document.querySelector('.products');
const loading = document.querySelector('h2.loading');
const ronnie = document.querySelector('.cart__products');

const prometeuNada = new Promise((resolve, reject) => {
  const exibition = async () => {
    try {
      const computador = await fetchProductsList('computador');
      loading.remove();
      computador.forEach((element) => {
        geral.appendChild(createProductElement(element));
      });
      resolve();
    } catch (error) {
      geral.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
      geral.classList.add('error');
      reject(error);
    }
  };
  exibition();
});

prometeuNada.then(() => {
  const cartAdd = async () => {
    const buttons = await document.querySelectorAll('.product__add');
    buttons.forEach((element) => {
      element.addEventListener('click', async () => {
        const fear = element.parentNode;
        const rip = fear.querySelector('.product__id');
        const tear = rip.innerHTML;
        saveCartID(tear);
        const arnold = await fetchProduct(tear);
        const schwarzenegger = createCartProductElement(arnold);
        ronnie.appendChild(schwarzenegger);
      });
    });
  };
  cartAdd();
}).catch((error) => {
  console.log(error);
});

const loadCart = async () => {
  const cartProducts = getSavedCartIDs();
  cartProducts.forEach((element) => {
    const loadFunction = async () => {
      const arnold = await fetchProduct(element);
      const schwarzenegger = createCartProductElement(arnold);
      ronnie.appendChild(schwarzenegger);
    };
    loadFunction();
  });
};
loadCart();

document.querySelector('.cep-button').addEventListener('click', searchCep);
