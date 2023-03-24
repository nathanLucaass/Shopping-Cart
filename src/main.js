import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';
import './style.css';

const geral = document.querySelector('.products');
const loading = document.querySelector('h2.loading');
const ronnie = document.querySelector('.cart__products');

const exibition = async (searchTerm = 'computador') => {
  try {
    const products = await fetchProductsList(searchTerm);
    loading.remove();
    products.forEach((element) => {
      geral.appendChild(createProductElement(element));
    });
    cartAdd();
  } catch (error) {
    geral.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
    geral.classList.add('error');
    console.log(error);
  }
};

const cartAdd = async () => {
  const buttons = await document.querySelectorAll('.product__add');
  buttons.forEach((element) => {
    element.addEventListener('click', async () => {
      const productId = element.parentNode.querySelector('.product__id').innerHTML;
      saveCartID(productId);
      const product = await fetchProduct(productId);
      const cartProduct = createCartProductElement(product);
      ronnie.appendChild(cartProduct);
    });
  });
};

exibition();

const loadCart = async () => {
  const cartProducts = getSavedCartIDs();
  cartProducts.forEach((element) => {
    const loadFunction = async () => {
      const product = await fetchProduct(element);
      const cartProduct = createCartProductElement(product);
      ronnie.appendChild(cartProduct);
    };
    loadFunction();
  });
};
loadCart();

const searchInput = document.getElementById('input');
searchInput.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
    const searchTerm = searchInput.value;
    geral.innerHTML = '';
    loading.style.display = 'block';
    exibition(searchTerm);
  }
});

document.querySelector('.cep-button').addEventListener('click', searchCep);
