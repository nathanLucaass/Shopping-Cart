import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });
  it('fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
    await fetchProduct('1377');
    expect(fetch).toHaveBeenCalledWith(`https://api.mercadolibre.com/items/1337`);
  });
  it('Verifica se um erro é lançado', async () => {
    await expect(fetchProduct()).rejects.toThrow('Termo de busca não informado');
  });
  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith(`https://api.mercadolibre.com/items/MLB1405519561`);
  });
});
